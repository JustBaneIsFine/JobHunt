'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const server_1 = require('./server');
test('should be 7', () => {
    expect((0, server_1.testFunc)(2, 5)).toBe(7);
});
test('should be 22', () => {
    expect((0, server_1.testFunc)(21, 1)).toBe(22);
});
