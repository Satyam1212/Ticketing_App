import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest, BadRequestError } from '@sbjtickets/common';
import { User } from '../models/user';

const router = express.Router();

router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 10 characters')
],
  validateRequest
  ,
  async (req: Request, res: Response) => {

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
    }, process.env.JWT_KEY!) // ! means to tell typescript that this is already checked

    //stored it on session object
    req.session = {
      jwt: userJwt
    }

    res.status(201).send(user)

  })

export { router as signupRouter }