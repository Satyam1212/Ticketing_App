import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 10 characters')
], async (req: Request, res: Response) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // console.log(errors)
    throw new RequestValidationError(errors.array())
  }

  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    // console.log('Email in use')
    // return res.send({})
    throw new BadRequestError('Email in use');
  }

  const user = User.build({ email, password })

  //to save to db
  await user.save()

  // Generate jWT //if you check document here we didnt provide any callback so it will Synchronously
  const userJwt = jwt.sign({
    id: user.id,
    email: user.email
  }, 'asdf')

  //stored it on session object
  req.session = {
    jwt: userJwt
  }

  res.status(201).send(user)

})

export { router as signupRouter }