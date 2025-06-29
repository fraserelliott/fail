const Field = require("./fields/field");
const StringField = require("./fields/string-field")
const BooleanField = require("./fields/boolean-field");
const NumberField = require("./fields/number-field");

class FailSchema {
    constructor() {
        this.fields = new Map();
    }

    validate(params) {
        if (typeof params !== "object" || params === null || Array.isArray(params)) {
            throw new TypeError("params parameter must be a non-null object.");
        }

        for (const [param, validator] of this.fields) {
            let result;
            try {
                result = validator.validate(params[param]);
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

    validateAll(params) {
        if (typeof params !== "object" || params === null || Array.isArray(params)) {
            throw new TypeError("params parameter must be a non-null object.");
        }

        let result = { valid: true };
        for (const [param, validator] of this.fields) {
            let fieldResult;
            try {
                fieldResult = validator.validateAll(params[param]);
            } catch (err) {
                throw new Error(`Validator for parameter ${param} threw an error:\n${err.message}`);
            }

            if (typeof fieldResult !== "object" || fieldResult === null) {
                throw new TypeError(`Validator for parameter "${param}" must return a non-null object.`);
            }

            if (typeof fieldResult.valid !== "boolean") {
                throw new TypeError(`Validator for parameter "${param}" must return an object with a boolean 'valid' property.`);
            }

            if (!fieldResult.valid) {
                if (!Array.isArray(fieldResult.errors) || fieldResult.errors.length === 0) {
                    throw new TypeError(`Validator for parameter "${param}" must return a non-empty array 'errors' when 'valid' is false.`)
                }

                for (const err of fieldResult.errors) {
                    if (
                        typeof err !== "object" ||
                        typeof err.rule !== "string" ||
                        typeof err.error !== "string"
                    ) {
                        throw new TypeError(`Each error entry in the 'errors' array for "${param}" must be an object with string 'rule' and 'error' properties`);
                    }
                }

                result[param] = { valid: false, errors: fieldResult.errors };
                result.valid = false;
            } else {
                result[param] = { valid: true }
            }
        }
        
        return result;
    }

    add(param, validator) {
        if (validator == null || !(validator instanceof Field)) {
            throw new TypeError("validator parameter must be a non-null instance of Field or any subclass.")
        }

        if (typeof param !== "string" || !param) {
            throw new TypeError("param parameter must be a non-empty string.");
        }

        this.fields.set(param, validator);
    }
}

module.exports = { FailSchema, Field, StringField, BooleanField, NumberField };