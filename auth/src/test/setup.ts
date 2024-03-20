import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

import { app } from '../app';

//typescript code to tell their is global in typescript
declare global {
    var signup: () => Promise<string[]>
}
let mongo: any;
//Hook
beforeAll(async () => {

    process.env.JWT_KEY = 'asdfasdfa'

    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {});
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections()

    for (let collection of collections) {
        await collection.deleteMany({})
    }
})

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
})

global.signup = async () => {

    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app)
        .post('/api/users/signup')
        .send({ email, password })
        .expect(201)

    const cookie = response.get('Set-Cookie')

    return cookie;

}