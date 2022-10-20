import { usernameExists, createNewUser } from '../databaseConnection';
import { generateHash } from './hashing';

export async function handleRegister(username, password) {
    let newHash: string;
    console.log('handleRegister function DID RUN');
    if (await usernameExists(username)) {
        return false;
    } else {
        newHash = await generateHash(password);
        //send username and hash to database
        const newUser = { username: username, hash: newHash };
        await createNewUser(newUser);
        return true;
    }
}

export async function handleLogin(username, password) {
    //hello
}
