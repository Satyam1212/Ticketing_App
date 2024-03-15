import { scrypt, randomBytes } from 'crypto';
//downside of scrypt is callback based
import { promisify } from 'util'

//So we can take this callback based function(scrypt) and turn it into a promise based implementation which is compatible with using async await

const scryptAsync = promisify(scrypt)

export class Password {
    //static methods are methods that we can access without creating an instance of the class
    //like Password.toHash
    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex');//part of hashing process

        const buf = (await scryptAsync(password, salt, 64)) as Buffer;//we get buffer which is kind of like an array with raw data of it

        return `${buf.toString('hex')}.${salt}`;

    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        const [hashedPassword, salt] = storedPassword.split('.');
        const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

        return buf.toString('hex') === hashedPassword;


    }
}
