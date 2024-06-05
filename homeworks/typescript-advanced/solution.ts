interface Result {
    value: number;
    error: string;
}

interface Calculator {
    add(a: number, b: number): Result;
    subtract(a: number, b: number): Result;
    multiply(a: number, b: number): Result;
    divide(a: number, b: number): Result;
    power(a: number, b: number): Result;
    power(base: number, exponent: number): Result;
    sqrt(num: number): Result;
}