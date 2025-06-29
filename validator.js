const ParameterValidator = require("./parameter-validator");

class Validator {
    constructor() {
        this.parameterValidators = new Map();
    }

    validate(params) {
        if (typeof params != "array") {
            throw new TypeError("params parameter must be an array.");
        }
        for (const {param, parameterValidator} of this.parameterValidators) {
            let result;
            try {
                result = parameterValidator.validate(params[param]);
            } catch (err) {
                throw new Error(`Validator for parameter ${param} threw an error:\n${err.message}`);
            }

            if (!result.valid) {
                return { valid: false, error: `${param} ${result.error}`};
            }
        }
        return { valid: true };
    }

    add(param, validator) {
        if(validator == null || !(validator instanceof ParameterValidator)) {
            throw new TypeError("validator parameter must be a non-null instance of ParameterValidator or any subclass.")
        }

        if (typeof param !== "string" || !param) {
            throw new TypeError("param parameter must be a non-empty string.");
        }

        this.parameterValidators.set(param, validator);
    }
}

module.exports = { Validator, ParameterValidator };