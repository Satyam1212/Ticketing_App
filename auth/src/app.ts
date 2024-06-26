import express from 'express';
//No need of body-parser from version 4.16
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler, NotFoundError } from '@sbjtickets/common';
// import { NotFoundError } from './errors/not-found-error';

export const app = express()
app.set('trust proxy', true)//reason : traffic is being proximate to our application through ingress and nginx
app.use(express.json())
app.use(
    cookieSession({
        signed: false,//We are going to disabled encryption on this cookie because jwt already encrypted
        secure: process.env.NODE_ENV !== 'test',//Cookie only used when user visiting our application over HTTPS connection

    })
)

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', async () => {
    throw new NotFoundError()
})

app.use(errorHandler)