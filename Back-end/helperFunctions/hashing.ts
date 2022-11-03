import bcrypt from 'bcrypt';

export async function generateHash(password) {
    return bcrypt.hash(password, 10);
}

export async function passMatches(password, hash) {
    return bcrypt.compare(password, hash);
}
