class Serializable {
    constructor() {
    }

    serialize() {
        const objToSerialize = {};
        for (const key in this) {
            if (this.hasOwnProperty(key) && typeof this[key] !== 'function') {
                objToSerialize[key] = this._serializeValue(this[key]);
            }
        }
        objToSerialize['__class__'] = this.constructor.name;
        return JSON.stringify(objToSerialize);
    }

    wakeFrom(serialized) {
        const parsed = JSON.parse(serialized);
        const className = this.constructor.name;
        if (parsed.__class__ !== className) {
            throw new Error('the parsed object is of invalid class ' + parsed.__class__);
        }
        const unexpectedKeys = Object.keys(parsed).filter(key => key !== '__class__' && !this.hasOwnProperty(key));
        if (unexpectedKeys.length > 0) {
            throw new Error(`unexpected keys '${unexpectedKeys.join(', ')}' found in serialized data`);
        }
        for (const key in parsed) {
            if (key !== '__class__') {
                this[key] = this._deserializeValue(parsed[key]);
            }
        }
        return this;
    }

    _serializeValue(value) {
        if (typeof value === 'number' && (isNaN(value) || !isFinite(value)))
            return value.toString();
        if (value === null || typeof value === 'number' || typeof value === 'string' || value instanceof Date)
            return value;
        if (Array.isArray(value))
            return value.map(elem => this._serializeValue(elem));
        if (typeof value === 'object') {
            const objSerialized = {};
            for (const key in value) {
                if (typeof value[key] !== 'function') 
                    objSerialized[key] = this._serializeValue(value[key]);
            }
            return objSerialized;
        }
        throw new Error('cannot serialize value of type ' + typeof value);
    }

    _deserializeValue(value) {
        if (typeof value === 'string') {
            if (value === 'Infinity') return Infinity;
            if (value === 'NaN') return NaN;
            if (value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/))
                return new Date(value);
            if (value === '-0') return 0;
            return value;
        }
        if (value === null || typeof value === 'number')
            return value;
        if (Array.isArray(value)) 
            return value.map(elem => this._deserializeValue(elem));
        if (typeof value === 'object') {
            const objDeserialized = {};
            for (const key in value) {
                objDeserialized[key] = this._deserializeValue(value[key]);
            }
            return objDeserialized;
        }
        throw new Error('cannot deserialize value of type ' + typeof value);
    }
}

class UserDTO extends Serializable {
    constructor(firstName, lastName, phone, birth) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.birth = birth;
    }

    printInfo() {
        console.log(
            `${this.firstName[0]}. ${this.lastName} - ${this.phone
            }, ${this.birth.toISOString()}`,
        );
    }
}

let tolik = new UserDTO(
    'Anatoliy',
    'Nashovich',
    '2020327',
    new Date('1999-01-02'),
);

tolik.printInfo(); //A. Nashovich - 2020327, 1999-01-02T00:00:00.000Z

let serialized = tolik.serialize();
tolik = null;

const resurrectedTolik = new UserDTO().wakeFrom(serialized);

// non-valid / non-expected content of serialized line must call for an exception in case of waking up
serialized = serialized.replace('f', 's'); 
try {
    new UserDTO().wakeFrom(serialized); // Error('unexpected keys 'sirstName' found in serialized data)
} catch (e) {
    console.log(e.message);
}


console.log(resurrectedTolik instanceof UserDTO); // true
console.log(resurrectedTolik.printInfo()); // A. Nashovich - 2020327, 1999-01-02T00:00:00.000Z
// Date props to be restored as Date objects after waking up
console.log('birth is a date object: ' + (resurrectedTolik.birth instanceof Date)); // true

class Post extends Serializable {
    constructor(content, date, author) {
        super();
        this.content = content;
        this.date = date;
        this.author = author;
    }
}

// any attempt to wake from a serialized line of other class must throw an exception
try {
    console.log(new Post().wakeFrom(serialized)); // Error('the parsed object is of invalid class UserDTO)
} catch (e) {
    console.log(e.message);
}

// array props -- all the members to be serialized by the same rules
class Nested extends Serializable {
    constructor(a, b, c) {
        super();
        this.a = a;
        this.b = b;
        this.c = c;
    }
}
const nested = new Nested({ a: {b: 'c', d: { e: 'f', g: new Date() }} }, [1, [2, [3, 4], 5], 6], new Date());
const nestedSerialized = nested.serialize();
const nestedWaked = new Nested().wakeFrom(nestedSerialized);
console.log(nestedWaked); // original object

class WeirdCalculationResult extends Serializable {
    constructor(num1, num2, num3) {
        super();
        this.a = num1;
        this.b = num2;
        this.c = num3;
    }
}

const weird = new WeirdCalculationResult(Infinity, NaN, -0);
const weirdSerialized = weird.serialize();
const weirdWaked = new WeirdCalculationResult().wakeFrom(weirdSerialized);
console.log(weirdWaked); // { a: Infinity, b: NaN, c: 0 }



