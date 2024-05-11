class Human {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
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
                if (value.hasOwnProperty(key) && typeof value[key] !== 'function') {
                    objSerialized[key] = this._serializeValue(value[key]);
                }
            }
            return objSerialized;
        }
        throw new Error('cannot serialize value of type ' + typeof value);
    }

    _deserializeValue(value) {
        if (typeof value === 'string' && value === 'Infinity') return Infinity;
        if (typeof value === 'string' && value === 'NaN') return NaN;
        if (value === null || typeof value === 'string' || typeof value === 'number' || value instanceof Date) 
            return value;
        if (Array.isArray(value)) 
            return value.map(elem => this._deserializeValue(elem));
        if (typeof value === 'object') {
            const objDeserialized = {};
            for (const key in value) {
                if (value.hasOwnProperty(key)) {
                    objDeserialized[key] = this._deserializeValue(value[key]);
                }
            }
            return objDeserialized;
        }
        throw new Error('cannot deserialize value of type ' + typeof value);
    }
}

class Citizen extends Human {
    constructor(firstName, lastName, id, obj) {
        super(firstName, lastName);
        this.id = id;
        this.obj = obj;
    }
}

const cit = new Citizen('Michał', 'Nadolny', NaN, { a: 'b', c: { d: 'e', dd: new Date() } });
const s = cit.serialize();
console.log(cit.wakeFrom(s));
// const c = cit.deserialize(s);
// console.log(c);