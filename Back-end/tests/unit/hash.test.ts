import { generateHash, passMatches } from '../../helperFunctions/hashing';

const pass1 = 'hello';
const pass2 = 'heleo';

describe('hashing works', () => {
    test('should succeed ', async () => {
        const hash = await generateHash(pass1);
        const result = await passMatches(pass1, hash);
        expect(result).toBe(true);
    });
    test('should fail', async () => {
        const hash = await generateHash(pass1);
        const result = await passMatches(pass2, hash);
        expect(result).toBe(false);
    });
    test('should fail', async () => {
        const result = await passMatches(pass1, 'g12g12gg12g212');
        expect(result).toBe(false);
    });
    test('should succeed', async () => {
        const hash = await generateHash(pass2);
        const result = await passMatches(pass2, hash);
        expect(result).toBe(true);
    });
});
