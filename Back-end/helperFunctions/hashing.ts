import bcrypt from 'bcrypt';

export function generateHash(password) {
    return bcrypt.hash(password, 10);
}

export function passMatches(password, hash) {
    return bcrypt.compare(password, hash);
}
