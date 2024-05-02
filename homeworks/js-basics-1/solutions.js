// http://www.codewars.com/kata/opposite-number
function opposite(number) {
    return -number;
}

// http://www.codewars.com/kata/basic-mathematical-operations
function basicOp(operation, value1, value2) {
    switch (operation) {
        case '+':
            return value1 + value2;
        case '-':
            return value1 - value2;
        case '*':
            return value1 * value2;
        case '/':
            return value1 / value2;
        default:
            return NaN;
    }
}

// http://www.codewars.com/kata/printing-array-elements-with-comma-delimiters
function printArray(array) {
    return array.join(',');
}

// http://www.codewars.com/kata/transportation-on-vacation
function rentalCarCost(d) {
    let discount = 0;
    if (d >= 7) {
        discount = 50;
    } else if (d >= 3) {
        discount = 20;
    }
    const costPerDay = 40;
    return costPerDay * d - discount;
}

// http://www.codewars.com/kata/calculating-with-functions
function zero(f) {
    return f ? f(0) : 0;
}
function one(f) {
    return f ? f(1) : 1;
}
function two(f) {
    return f ? f(2) : 2;
}
function three(f) {
    return f ? f(3) : 3;
}
function four(f) {
    return f ? f(4) : 4;
}
function five(f) {
    return f ? f(5) : 5;
}
function six(f) {
    return f ? f(6) : 6;
}
function seven(f) {
    return f ? f(7) : 7;
}
function eight(f) {
    return f ? f(8) : 8;
}
function nine(f) {
    return f ? f(9) : 9;
}

function plus(a) {
    return (b) => b + a;
}
function minus(a) {
    return (b) => b - a;
}
function times(a) {
    return (b) => b * a;
}
function dividedBy(a) {
    return (b) => Math.floor(b / a);
}

// http://www.codewars.com/kata/get-the-middle-character
function getMiddle(s) {
    const mid = Math.floor(s.length / 2);
    if (s.length % 2 === 1) {
        return s[mid];
    }
    return s.slice(mid - 1, mid + 1);
}

// http://www.codewars.com/kata/partition-on
function partitionOn(pred, items) {
    let left = [];
    let right = [];
    for (let item of items) {
        if (!pred(item)) {
            left.push(item);
        } else {
            right.push(item);
        }
    }
    items.length = 0;
    items.push(...left, ...right);
    return left.length;
}

// https://www.codewars.com/kata/526571aae218b8ee490006f4
function countBits(n) {
    let onesCount = 0;
    let reminder;
    do {
        reminder = n % 2;
        if (reminder === 1) {
            onesCount++;
        }
        n = Math.floor(n / 2);
    } while (n > 0);
    return onesCount;
}

// https://www.codewars.com/kata/find-the-odd-int/
function findOdd(A) {
    let count = new Map();
    for (let item of A) {
        if (!count.has(item)) {
            count.set(item, 1);
        } else {
            count.set(item, count.get(item) + 1);
        }
    }
    for (let key of count.keys()) {
        if (count.get(key) % 2 === 1) {
            return key;
        }
    }
    return null;
}

// https://www.codewars.com/kata/find-the-parity-outlier
function findOutlier(integers) {
    let evenCount = integers.reduce((acc, int) => acc + (Math.abs(int % 2) === 0), 0)
    if (evenCount === 1) {
        return integers.find(int => Math.abs(int % 2) === 0)
    }
    return integers.find(int => Math.abs(int % 2) === 1)
}

// https://www.codewars.com/kata/zipwith
function zipWith(fn, a0, a1) {
    if (a0.length <= a1.length) {
        return a0.map((item, index) => fn(item, a1[index]));
    }
    return a1.map((item, index) => fn(a0[index], item));
}

// https://www.codewars.com/kata/filter-the-number
function filterString(value) {
    let strNumber = '';
    for (let char of value) {
        let number = parseInt(char, 10);
        if (number || number === 0) {
            strNumber += char;
        }
    }
    return parseInt(strNumber, 10);
}

// https://www.codewars.com/kata/n-th-fibonacci
function nthFibo(n) {
    if (n === 1) {
        return 0;
    }
    if (n === 2) {
        return 1;
    }
    return nthFibo(n - 2) + nthFibo(n - 1);
}

// https://www.codewars.com/kata/cat-and-mouse-2d-version/
function findMapInfo(map) {
    let x = 0;
    let y = 0;
    let cPos, mPos;
    let width = 0, height = 0;
    for (let i = 0; i < map.length; i++) {
        let field = map[i];
        if (field.indexOf('\n') !== -1) {
            width = x;
            x = 0;
            y++;
            continue;
        }
        if (field === 'C') {
            cPos = [x, y];
        }
        if (field === 'm') {
            mPos = [x, y];
        }
        x++;
    }
    height = y + 1;
    return [cPos, mPos, width, height];
}

function findDistance(cPos, mPos) {
    return Math.sqrt(Math.pow(mPos[0] - cPos[0], 2) + Math.pow(mPos[1] - cPos[1], 2));
}

function findMinMoves(cPos, mPos, width, height) {
    if (cPos[1] === mPos[1] && cPos[0] === mPos[0]) {
        return 0;
    }

    const distance = findDistance(cPos, mPos);

    let movesUp = Infinity;
    let movesDown = Infinity;
    let movesLeft = Infinity;
    let movesRight = Infinity;

    if (cPos[1] !== 0) {
        const newCPos = [cPos[0], cPos[1] - 1];
        if (findDistance(newCPos, mPos) < distance)
            movesUp = findMinMoves(newCPos, mPos, width, height);
    }
    if (cPos[0] !== width - 1) {
        const newCPos = [cPos[0] + 1, cPos[1]];
        if (findDistance(newCPos, mPos) < distance)
            movesRight = findMinMoves(newCPos, mPos, width, height);
    }
    if (cPos[1] !== height - 1) {
        const newCPos = [cPos[0], cPos[1] + 1];
        if (findDistance(newCPos, mPos) < distance)
            movesDown = findMinMoves(newCPos, mPos, width, height);
    }
    if (cPos[0] !== 0) {
        const newCPos = [cPos[0] - 1, cPos[1]];
        if (findDistance(newCPos, mPos) < distance)
            movesLeft = findMinMoves(newCPos, mPos, width, height);
    }

    return Math.min(movesUp, movesDown, movesLeft, movesRight) + 1;
}

function catMouse(map, moves) {
    const [cPos, mPos, width, height] = findMapInfo(map);
    if (!cPos || !mPos) {
        return 'boring without two animals';
    }
    const minMoves = findMinMoves(cPos, mPos, width, height);
    if (minMoves > moves) {
        return 'Escaped!';
    }
    return 'Caught!';
}

// https://www.codewars.com/kata/duplicate-encoder
function duplicateEncode(word) {
    let letterMap = new Map();
    let chars = word.toLowerCase().split('');
    chars.forEach(char => {
        if (!letterMap.has(char)) {
            letterMap.set(char, 1);
        } else {
            letterMap.set(char, letterMap.get(char) + 1);
        }
    });
    return chars.map(char => {
        if (letterMap.get(char) > 1) {
            return ')';
        }
        return '(';
    }).join('');
}

// TODO: put 1st hashed cata here

// https://www.codewars.com/kata/576757b1df89ecf5bd00073b
function towerBuilder(nFloors) {
    const baseWidth = nFloors + (nFloors - 1);
    let tower = [];
    for (let i = 0; i < nFloors; i++) {
        const blockCount = (i + 1) + i;
        const freeSpace = baseWidth - blockCount;
        tower.push('');
        for (let j = 0; j < freeSpace / 2; j++) {
            tower[i] += ' ';
        }
        for (let j = 0; j < blockCount; j++) {
            tower[i] += '*';
        }
        for (let j = 0; j < freeSpace / 2; j++) {
            tower[i] += ' ';
        }
    }
    return tower;
}

// https://www.codewars.com/kata/58f5c63f1e26ecda7e000029
function wave(str) {
    let waves = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== ' ') {
            waves.push(str.slice(0, i) + str[i].toUpperCase() + str.slice(i + 1));
        }
    }
    return waves;
}

// https://www.codewars.com/kata/59d398bb86a6fdf100000031
function stringBreakers(n, string) {
    let retString = '';
    let counter = 1;
    for (let i = 0; i < string.length; i++) {
        if (string[i] !== ' ') {
            retString += string[i];
            if (counter == n) {
                retString += '\n';
                counter = 1;
                continue;
            }
            counter++;
        }
    }
    return retString;
}

// https://www.codewars.com/kata/514a024011ea4fb54200004b
function domainName(url) {
    const match = url.match(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/);
    if (match && match[1]) {
        return match[1].split('.')[0];
    }
    return null;
}
