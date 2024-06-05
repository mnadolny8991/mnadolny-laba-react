interface Result {
    value: number;
    error: string;
}

interface Calculator {
    add(a: number, b: number): Result;
    subtract(a: number, b: number): Result;
    multiply(a: number, b: number): Result;
    divide(a: number, b: number): Result;
    power(base: number, exponent: number): Result;
    sqrt(num: number): Result;
}

class BasicCalculator implements Calculator {
    add(a: number, b: number): Result {
        return { value: a + b, error: '' };
    }
    subtract(a: number, b: number): Result {
        return { value: a - b, error: '' };
    }
    multiply(a: number, b: number): Result {
        return { value: a * b, error: '' };
    }
    divide(a: number, b: number): Result {
        return { value: a / b, error: '' };
    }
    power(base: number, exponent: number): Result {
        if (!Number.isInteger(exponent) || exponent < 0) 
            return { value: NaN, error: 'Exponent must be a positive integer' };
        return { value: Math.pow(base, exponent), error: '' };
    }
    sqrt(num: number): Result {
        if (num < 0)
            return { value: NaN, error: 'Cannot calculate the square root of a negative number' };
        return { value: Math.sqrt(num), error: '' }
    }
}