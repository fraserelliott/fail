const ParameterValidator = require("./parameter-validator");

class Validator {
    constructor() {
        this.parameterValidators = new Map();
    }

    validate(params) {
        if (typeof params !== "object" || params === null || Array.isArray(params)) {
            throw new TypeError("params parameter must be a non-null object.");
        }

        for (const { param, parameterValidator } of this.parameterValidators) {
            let result;
            try {
                result = parameterValidator.validate(params[param]);
            } catch (err) {
                throw new Error(`Validator for parameter ${param} threw an error:\n${err.message}`);
            }

            if (typeof result !== "object" || result === null) {
                throw new TypeError(`Validator for parameter "${param}" must return a non-null object.`);
            }

            if (typeof result.valid !== "boolean") {
                throw new TypeError(`Validator for parameter "${param}" must return an object with a boolean 'valid' property.`);
            }

            if (!result.valid) {
                if (typeof result.error !== "string" || result.error.trim() === "") {
                    throw new TypeError(`Validator for parameter "${param}" must return a non-empty string 'error' when 'valid' is false.`);
                }
                return { valid: false, error: `${param} ${result.error}` };
            }
        }
        return { valid: true };
    }

    add(param, validator) {
        if (validator == null || !(validator instanceof ParameterValidator)) {
            throw new TypeError("validator parameter must be a non-null instance of ParameterValidator or any subclass.")
        }

        if (typeof param !== "string" || !param) {
            throw new TypeError("param parameter must be a non-empty string.");
        }

        this.parameterValidators.set(param, validator);
    }
}

module.exports = { Validator, ParameterValidator };