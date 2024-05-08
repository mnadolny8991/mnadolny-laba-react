// const user = {
//     username: 'testuser1',
//     preferences: {
//         sound: {
//             maxValue: 50,
//             value: 30,
//         },
//     },
// };
// const randomValue = Math.random();
// const nullValue = null;

// https://github.com/qaprosoft/react-laba-international-3/blob/main/lectures/08-js-advanced-1/task.md
function pluck(obj, expr) {
    const chain = expr.split('.');
    if (chain[0] === '' && obj) {
        return obj;
    } else if (!obj) {
        return null;
    }
    return pluck(obj[chain[0]], chain.slice(1).join('.'));
}

// console.log(pluck(user, 'preferences.sound.value')); // 30
// console.log(pluck(user, 'unknown.key')); // null
// console.log(pluck(randomValue, 'unknown.key')); // null
// console.log(pluck(nullValue, 'unknown.key')); // null

// -----------------------------------------------------------------------------------------------------

// const user = {
//     username: 'testuser1',
//     preferences: {
//         sound: {
//             maxValue: 50,
//             value: 30,
//         },
//     },
// };

// https://github.com/qaprosoft/react-laba-international-3/blob/main/lectures/08-js-advanced-1/task.md
function clone(obj) {
    let cloned = {};
    for (let [key, val] of Object.entries(obj)) {
        if (typeof val !== 'object') {
            cloned[key] = val;
        } else {
            cloned[key] = clone(val);
        }
    }
    return cloned;
}

// const clonedUser = clone(user);

// clonedUser.preferences.sound.maxValue = 70;

// console.log(
//     user.preferences.sound.maxValue === clonedUser.preferences.sound.maxValue,
// ); // false

// -----------------------------------------------------------------------------------------------------


// https://github.com/qaprosoft/react-laba-international-3/blob/main/lectures/08-js-advanced-1/task.md
function moment(dateStr, format) {
    if (dateStr.length !== format.length) {
        return null;
    }
    let day, month, year, hour, minute, second;
    let match;
    let r;

    r = /DD/;
    match = format.match(r);
    if (!match) {
        return null;
    }
    day = parseInt(dateStr.slice(match.index, match.index + 2));
    r = /MM/;
    match = format.match(r);
    if (!match) {
        return null;
    }
    month = parseInt(dateStr.slice(match.index, match.index + 2));
    r = /YYYY/;
    match = format.match(r);
    if (!match) {
        return null;
    }
    year = parseInt(dateStr.slice(match.index, match.index + 4));
    r = /hh/;
    match = format.match(r);
    if (match) hour = parseInt(dateStr.slice(match.index, match.index + 2));
    r = /mm/;
    match = format.match(r);
    if (match) minute = parseInt(dateStr.slice(match.index, match.index + 2));
    r = /ss/;
    match = format.match(r);
    if (match) second = parseInt(dateStr.slice(match.index, match.index + 2));

    if (!second && !hour && !minute) {
        return new Date(year, month - 1, day);
    }

    return new Date(year, month - 1, day, hour, minute, second);
}

function offset(date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const hours = Math.floor(diff / 1000 / 3600) % 24;
    const days = Math.floor(diff / 1000 / 3600 / 24);

    if (days < 1) {
        if (hours < 1) {
            if (minutes < 1) {
                return `${seconds} seconds ago`;
            }
            return `${minutes} minutes ago`;
        }
        if (minutes === 0) {
            return `${hours} hours ago`;
        }
        return `${hours} hours ${minutes} minutes ago`;
    }
    return `${days} days ago`;
}


// console.log(offset(moment('08/05/2024 10:03:00', 'DD/MM/YYYY hh:mm:ss')));
// console.log(offset(moment('04/05/2024 13:00:00', 'DD/MM/YYYY hh:mm:ss')));
// console.log(offset(moment('01/05/2024 11:30:00', 'DD/MM/YYYY hh:mm:ss')));
// console.log(offset(moment('22/02/2024 14:00:00', 'DD/MM/YYYY hh:mm:ss')));
// console.log(offset(moment('23/02/2023 10:00:00', 'DD/MM/YYYY hh:mm:ss')));

// -----------------------------------------------------------------------------------------------------

const date1 = moment('23/01/2021', 'DD/MM/YYYY');
const date2 = moment('23/02/2021', 'DD/MM/YYYY');

function randomIntBetween(a, b) {
    return Math.floor(Math.random() * (b - a) + a);
}

function randomDate(dateStart, dateEnd) {
    const timestampStart = dateStart.getTime();
    const timestampEnd = dateEnd.getTime();
    const date = new Date(randomIntBetween(timestampStart, timestampEnd));
    return date;
}

// console.log(randomDate(date1, date2));
// // 2021-02-03T06:36:01.756Z

// CODEWARS
// -----------------------------------------------------------------------------------------------------

// https://www.codewars.com/kata/596cf5b0e1665a2d02000007/train/javascript
function objConcat(arr) {
    let merged = {};
    return Object.assign(merged, ...arr);
}

// https://www.codewars.com/kata/547f1a8d4a437abdf800055c
function NamedOne(first, last) {
    this.firstName = first;
    this.lastName = last;

    Object.defineProperty(this, 'fullName', {
        get: function () {
            return this.firstName + ' ' + this.lastName;
        },
        set: function (value) {
            var names = value.split(' ');
            if (names.length === 2) {
                this.firstName = names[0];
                this.lastName = names[1];
            }
        }
    });
}

// https://www.codewars.com/kata/54834b3559e638b39d0009a2
function OnceNamedOne(first, last) {
    Object.defineProperty(this, 'firstName', {
        value: first,
        writable: false
    });
    Object.defineProperty(this, 'lastName', {
        value: last,
        writable: false
    });
    Object.defineProperty(this, 'fullName', {
        value: first + ' ' + last,
        writable: false
    });
}

// https://www.codewars.com/kata/partial-keys
function partialKeys(obj) {
    const sortedKeys = Object.keys(obj).sort();
    const partialKeyProxy = new Proxy(obj, {
        get: function (target, prop) {
            const partialKeys = sortedKeys.filter(key => key.startsWith(prop));
            const firstPartialKey = partialKeys[0];
            return firstPartialKey ? target[firstPartialKey] : undefined;
        }
    });
    return partialKeyProxy;
}

// https://www.codewars.com/kata/human-readable-time
function humanReadable(seconds) {
    const h = Math.floor(seconds / 3600);
    let remaining = seconds - h * 3600;
    const m = Math.floor(remaining / 60);
    remaining = seconds - h * 3600 - m * 60;
    const s = remaining;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}