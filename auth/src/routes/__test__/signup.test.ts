import request from 'supertest';
import { app } from '../../app';

//1st one is description and second one is argument
it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)
})