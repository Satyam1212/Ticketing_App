import request from 'supertest';
import { app } from '../../app';

it('responds with details about current user', async () => {
    // const authResponse = await request(app)
    //     .post('/api/users/signup')
    //     .send({
    //         email: 'test@test.com',
    //         password: 'password'
    //     })
    //     .expect(201)

    // const cookie = authResponse.get('Set-Cookie')

    const cookie = await global.signup()

    const response2 = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200)

    console.log(response2.body)
    expect(response2.body.currentUser.email).toEqual('test@test.com')
})

it('responds with null if not authenticated', async () => {

    const response2 = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200)


    expect(response2.body.currentUser).toEqual(null)
})