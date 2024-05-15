// https://www.codewars.com/kata/55e7650c8d894146be000095
function validateMessage(msg) {
    if (msg === null)
        throw new ReferenceError('Message is null!');
    if (typeof msg !== 'string')
        throw new TypeError(`Message should be of type string but was of type ${typeof msg}!`);
    if (msg.length > 255 || msg.length < 1)
        throw new RangeError(`Message contains ${msg.length} characters!`);
    return !/<.*>/.test(msg);
}

// https://www.codewars.com/kata/5a353a478f27f244a1000076
async function sayJoke(apiUrl, jokeId) {
    const res = await fetch(apiUrl);
    const data = await res.json();
    if (!(data.hasOwnProperty('jokes') && data.jokes instanceof Array))
        throw new Error(`No jokes at url: ${apiUrl}`);
    const joke = data.jokes.find(j => j.id === jokeId);
    if (!joke)
        throw new Error(`No jokes found id: ${jokeId}`);
    joke['saySetup'] = () => joke.setup;
    joke['sayPunchLine'] = () => joke.punchLine;
    return joke;
}

// -----------------------------------------------------------------------
// -----------------------------------------------------------------------

let secondsElapsed = 0;

function showElapsed() {
    secondsElapsed += 1;
    console.log(`Elapsed time: ${secondsElapsed} s`);
}

const intervalId = setInterval(showElapsed, 1000);
setTimeout(() => clearInterval(intervalId), 5500);
