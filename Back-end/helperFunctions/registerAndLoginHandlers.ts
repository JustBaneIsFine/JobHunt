import { usernameExists, createNewUser } from '../databaseConnection';
import { generateHash, passMatches } from './hashing';

export interface userObject {
    age: string;
    email: string;
    hash: string;
    username: string;
}

export async function handleRegister(
    username: string,
    password: string
): Promise<false | userObject> {
    let newHash: string;
    if (await usernameExists(username)) {
        return false;
    } else {
        newHash = await generateHash(password);
        const newUser = {
            username: username,
            email: 'test',
            age: 'test55',
            hash: newHash,
        };
        await createNewUser(newUser);
        const userObject = await usernameExists(username);
        if (userObject != null) {
            return userObject;
        } else {
            return false;
        }
    }
}
export async function handleLogin(username: string, password: string) {
    const userObject = await usernameExists(username);
    if (userObject != null) {
        const passCheck = await passMatches(password, userObject.hash);
        return { passGood: passCheck, user: userObject };
    } else {
        return false;
    }
}
