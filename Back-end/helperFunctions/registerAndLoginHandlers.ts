import { usernameExists, createNewUser } from '../databaseConnection';
import { generateHash, passMatches } from './hashing';

export async function handleRegister(username: string, password: string) {
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
        return true;
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
