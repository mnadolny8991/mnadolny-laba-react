// https://www.codewars.com/kata/5715eaedb436cf5606000381
function positiveSum(arr) {
    return arr.reduce((acc, val) => (val > 0) ? acc + val : acc, 0);
}

// https://www.codewars.com/kata/5a3e1319b6486ac96f000049
function pairs(arr) {
    if (arr.length <= 1) {
        return 0;
    }
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (i % 2 === 0) {
            const first = arr[i];
            let second;
            if (i + 1 < arr.length) {
                second = arr[i + 1];
            }
            if (second) {
                const diff = Math.abs(first - second);
                if (diff === 1) {
                    count++;
                }
            }
        }
    }
    return count;
};

// https://www.codewars.com/kata/5aba780a6a176b029800041c
function maxMultiple(divisor, bound) {
    let max = 0;
    for (let i = divisor; i <= bound; i++) {
        if (i % divisor === 0) {
            max = i;
        }
    }
    return max;
}

// https://www.codewars.com/kata/514a6336889283a3d2000001
function getEvenNumbers(numbersArray) {
    return numbersArray.filter(n => n % 2 === 0);
}

// https://www.codewars.com/kata/5a090c4e697598d0b9000004
function solve(arr) {
    arr = arr.sort((a, b) => b - a);
    let left = 0;
    let right = arr.length - 1;
    let result = [];
    while (left <= right) {
        if (left === right) {
            result.push(arr[left]);
            break;
        }
        result.push(arr[left], arr[right]);
        left++;
        right--;
    }
    return result;
};