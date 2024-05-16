// Write a function that receives a variable containing a string, as a parameter and checks
// whether the contents of this variable begin with a digit or not, using a regular expression.
function startsWithDigit(str) {
    return /^\d+/.test(str);
}

// console.log(startsWithDigit('')); // false
// console.log(startsWithDigit('1')); // true
// console.log(startsWithDigit('41aabbcc')); // true
// console.log(startsWithDigit('snake')); // false
// console.log(startsWithDigit('snake123')); // false

// Check if this entry is a phone number, e.g. set the format of your country:
// Poland: +48 xxx xxx xxx
function isPolishPhoneNumber(number) {
    return /^\+48\s?\d{3}[-\s/]?\d{3}[-\s/]?\d{3}$/.test(number);
}

// console.log(isPolishPhoneNumber('+48725725444')); // true
// console.log(isPolishPhoneNumber('+48 725726111')); // true
// console.log(isPolishPhoneNumber('+48 725 722 111')); // true
// console.log(isPolishPhoneNumber('+48 725-726-111')); // true
// console.log(isPolishPhoneNumber('+48-725-726-111')); // false
// console.log(isPolishPhoneNumber('+48 725/726/111')); // true
// console.log(isPolishPhoneNumber('+55 725 725 444')); // false