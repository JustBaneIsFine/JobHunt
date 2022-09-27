// eslint-disable-next-line @typescript-eslint/no-var-requires
import { hello } from './testingFile';
test('returns the sum of two numbers', () => {
	const o = hello(1, 3);
	expect(o).toBe(4);
});
