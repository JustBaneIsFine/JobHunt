import { testFunc } from './server'

test('should be 7', () => {
    expect(testFunc(2, 5)).toBe(7)
})

test('should be 22', () => {
    expect(testFunc(21, 1)).toBe(22)
})
