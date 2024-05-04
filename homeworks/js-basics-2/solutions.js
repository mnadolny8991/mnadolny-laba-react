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

// https://www.codewars.com/kata/566044325f8fddc1c000002c
function evenChars(string) {
    const len = string.length;
    if (len < 2 || len >= 100) {
        return 'invalid string';
    }
    return string
        .split('')
        .filter((val, i) => (i % 2 === 1) && val);
}

// https://www.codewars.com/kata/545a4c5a61aa4c6916000755
function gimme(triplet) {
    return triplet.indexOf([...triplet].sort((a, b) => a - b)[1]);
}

// https://www.codewars.com/kata/578553c3a1b8d5c40300037c
const binaryArrayToNumber = arr => {
    return parseInt(arr.join(''), 2);
};

// https://www.codewars.com/kata/585d7d5adb20cf33cb000235
function findUniq(arr) {
    const map = new Map();
    for (let item of arr) {
        if (!map.has(item)) {
            map.set(item, 1);
        } else {
            map.set(item, map.get(item) + 1);
        }
    }
    for (let key of map.keys()) {
        if (map.get(key) === 1) return key;
    }
    return null;
}

// https://www.codewars.com/kata/581e014b55f2c52bb00000f8
function decipherThis(str) {
    const words = str.split(' ');
    return words.map(word => {
        const r = /^\d+/;
        const match = word.match(r);
        if (match) {
            const digitStr = match[0];
            const code = parseInt(digitStr, 10);
            const first = String.fromCharCode(code);
            if (digitStr.length === word.length) return first;
            const letters = word.split('');
            const start = digitStr.length;
            const val = letters[start];
            letters[start] = letters[letters.length - 1];
            letters[letters.length - 1] = val;
            return first + letters.slice(start).join('');
        }
    }).join(' ');
}

// https://www.codewars.com/kata/578aa45ee9fd15ff4600090d
function sortArray(array) {
    const oddSorted = [...array]
        .filter(item => Math.abs(item % 2) === 1)
        .sort((a, b) => a - b);
    let idx = 0;
    return [...array].map(item => {
        if (Math.abs(item) % 2 === 1) {
            return oddSorted[idx++];
        }
        return item;
    });
}

// https://www.codewars.com/kata/515bb423de843ea99400000a
