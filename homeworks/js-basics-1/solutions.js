function opposite(number) {
    return -number;
}

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

function printArray(array) {
    return array.join(',');
}

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

function getMiddle(s) {
    const mid = Math.floor(s.length / 2);
    if (s.length % 2 === 1) {
        return s[mid];
    }
    return s.slice(mid - 1, mid + 1);
}

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