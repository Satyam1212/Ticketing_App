import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface that describes the properties that are required to create a new User
interface UserAttrs {
    email: string;
    password: string
}

// An interface that describes the properties that a User model has(to tell typescript their is build method )
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;

}

//An interface that describes the properties of User Document //Here only you can add more attributes like createdAt
interface UserDoc extends mongoose.Document {
    email: string;
    password: string
}

//Remeber in mongoose we have to refer typos so Captital String
//var String: StringConstructor
//Allows manipulation and formatting of text strings and determination and location of substrings within strings.

//But in typescript we do use string
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed)

    }
    done();
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

//To create module
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// User.build({
//     email: 'ss',
//     password: '33'
// })

//e.g. If I pass this properties to the typescript typescript will not give us warning so thats why need connection between mongoose and typescript
// new User({
//     email: 'test@g.com',
//     passwor: 'rre',
//     ss: 22
// })

// const buildUser = (attrs: UserAttrs) => {
//     return new User(attrs)
// }
// buildUser({
//     email: 'ss',
//     password: '2'
// })

export { User }