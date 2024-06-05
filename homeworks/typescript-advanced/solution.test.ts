import { BasicCalculator } from "./solution";
const calc = new BasicCalculator();

test('1 + 2 = 3', () => {
    expect(calc.add(1, 2)).toEqual({ value: 3, error: '' });
});

test('22 - 22 = 0', () => {
    expect(calc.subtract(22, 22)).toEqual({ value: 0, error: '' });
});

test('33 * 2 = 66', () => {
    expect(calc.multiply(33, 2)).toEqual({ value: 66, error: '' });
});

test('33 / 3 = 11', () => {
    expect(calc.divide(33, 3)).toEqual({ value: 11, error: '' });
});

test('1 / 0 = Infinity', () => {
    expect(calc.divide(1, 0)).toEqual({ value: Infinity, error: '' });
});

test('2 ** 3 = 8', () => {
    expect(calc.power(2, 3)).toEqual({ value: 8, error: '' });
});

test('2 ** 1.1 is invalid', () => {
    expect(calc.power(2, 1.1)).toEqual({ value: NaN, error: 'Exponent must be a positive integer' });
});

test('2 ** -1.1 is invalid', () => {
    expect(calc.power(2, -1.1)).toEqual({ value: NaN, error: 'Exponent must be a positive integer' });
});

test('2 ** -2 is invalid', () => {
    expect(calc.power(2, -2)).toEqual({ value: NaN, error: 'Exponent must be a positive integer' });
});

test('sqrt(64) = 8', () => {
    expect(calc.sqrt(64)).toEqual({ value: 8, error: '' });
});

test('sqrt(-64) is invalid', () => {
    expect(calc.sqrt(-64)).toEqual({ value: NaN, error: 'Cannot calculate the square root of a negative number' });
});