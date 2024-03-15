import express from 'express';
//No need of body-parser from version 4.16
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express()
app.use(express.json())

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.get('*', ()=> {
    throw new NotFoundError()
})

app.use(errorHandler)

app.listen(3000, () => {
    console.log('Listening on 3000')
})
