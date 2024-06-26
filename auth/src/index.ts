import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY is not defined')
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not defined')
    }
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB auth')
    } catch (err) {
        console.error(err)

    }
    app.listen(3000, () => {
        console.log('Listening on 3000')
    })
}

start()

