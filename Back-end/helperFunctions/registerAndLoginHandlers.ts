import { usernameExists, createNewUser } from './mongoComm/users';
import { generateHash, passMatches } from './hashing';
import { userObject } from '../interfaces/userInterface';
import { createDefaultUserObject } from './userFunctions/defaultUserCreation';

export async function handleRegister(
    username: string,
    email: string,
    password: string
): Promise<false | userObject> {
    let newHash: string;
    if (await usernameExists(username)) {
        return false;
    } else {
        newHash = await generateHash(password);
        const newUser = createDefaultUserObject(username, email, newHash);

        await createNewUser(newUser);
        const userObject = await usernameExists(username);
        if (userObject != null) {
            return userObject;
        } else {
            return false;
        }
    }
}
export async function handleLogin(
    username: string,
    email: string,
    password: string
) {
    const userObject = await usernameExists(username);
    if (userObject != null) {
        const passCheck = await passMatches(password, userObject.hash);
        return { passGood: passCheck, user: userObject };
    } else {
        return false;
    }
}
