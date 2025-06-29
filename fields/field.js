class Field {
    constructor() {
        this.rules = new Map();
    }

    validate(value) {
        for (const [name, fn] of this.rules) {
            if (value === undefined && name !== "required") {
                continue; //Skip validation if it's undefined unless if it's required, undefined doesn't need to pass any other rules
            }

            let result;
            try {
                result = fn(value);
            } catch (err) {
                throw new Error(`Validation function for rule "${name}" threw an error:\n${err.message}`);
            }

            if (typeof result !== "object" || result == null) {
                throw new TypeError(`Validation function for rule "${name}" must return an object.`);
            }

            if (result.valid == null || typeof result.valid !== "boolean") {
                throw new TypeError(`Validation function for rule "${name}" must return an object with a boolean 'valid' property.`);
            } else if (!result.valid) {
                if (result.error == null || typeof result.error !== "string") {
                    throw new TypeError(`Validation function for rule "${name}" must return an object with a string 'error' property when 'valid' is false.`);
                }
                return result;
            }
        }
        return { valid: true };
    }

    validateAll(value) {
        const allErrors = [];
        for (const [name, fn] of this.rules) {
            if (value === undefined && name !== "required") {
                continue; //Skip validation if it's undefined unless if it's required, undefined doesn't need to pass any other rules
            }

            let result;
            try {
                result = fn(value);
            } catch (err) {
                throw new Error(`Validation function for rule "${name}" threw an error: ${err.message}`);
            }

            if (typeof result !== "object" || result == null) {
                throw new TypeError(`Validation function for rule "${name}" must return an object.`);
            }

            if (result.valid == null || typeof result.valid !== "boolean") {
                throw new TypeError(`Validation function for rule "${name}" must return an object with a boolean 'valid' property.`);
            } else if (!result.valid) {
                if (result.error == null || typeof result.error !== "string") {
                    throw new TypeError(`Validation function for rule "${name}" must return an object with a string 'error' property when 'valid' is false.`);
                }
                allErrors.push({ rule: name, error: result.error });
            }
        }
        const isValid = allErrors.length === 0;
        return { valid: isValid, errors: isValid ? undefined : allErrors };
    }

    addRule(name, fn) {
        if (!name || typeof name !== "string") {
            throw new TypeError("Rule name must be a non-empty string.");
        }

        if (fn == null || typeof fn !== "function") {
            throw new TypeError("Parameter fn must be a function.");
        }

        if (this.rules.has(name)) {
            throw new Error(`Validation rule with name "${name}" already exists.`);
        }

        this.rules.set(name, fn);
        return this;
    }

    required() {
        return this.addRule("required", (param) => {
            if (param !== undefined) {
                return { valid: true };
            } else {
                return { valid: false, error: "is mandatory" };
            }
        });
    }

    type(t) {
        return this.addRule("type", (param) => {
            if (typeof param === t) {
                return { valid: true };
            } else {
                return { valid: false, error: `must be of type ${t}` };
            }
        });
    }

    nonNull() {
        return this.addRule("nonNull", (param) => {
            if (param !== null) {
                return { valid: true };
            } else {
                return { valid: false, error: "cannot be null" };
            }
        });
    }
}

module.exports = Field;