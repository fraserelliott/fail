const Field = require("./field");

class StringField extends Field {
    constructor() {
        super();
        this.type("string");
    }

    minLength(min) {
        return this.addRule("minLength", (param) => {
            if (param.length >= min) {
                return { valid: true };
            } else {
                return { valid: false, error: `must be at least ${min} characters.` };
            }
        });
    }

    maxLength(max) {
        return this.addRule("maxLength", (param) => {
            if (param.length <= max) {
                return { valid: true };
            } else {
                return { valid: false, error: `cannot exceed ${max} characters` };
            }
        });
    }

    regex(pattern) {
        return this.addRule("regex", (param) => {
            if (pattern.test(param)) {
                return { valid: true };
            } else {
                return { valid: false, error: `does not match the required pattern: ${pattern}` };
            }
        });
    }

    email() {
        return this.addRule("email", (param) => {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (pattern.test(param)) {
                return { valid: true };
            } else {
                return { valid: false, error: `must be a valid email address.` };
            }
        });
    }

    website() {
        return this.addRule("website", (param) => {
            const pattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}([\/\w\-.\?%&=]*)?$/;
            if (pattern.test(param)) {
                return { valid: true };
            } else {
                return { valid: false, error: `must be a valid website address.` };
            }
        });
    }

    alphanumeric() {
        return this.addRule("alphanumeric", (param) => {
            const pattern = /^[a-zA-Z0-9]+$/;
            if (pattern.test(param)) {
                return { valid: true };
            } else {
                return { valid: false, error: `must be alphanumeric.` };
            }
        });
    }
}

module.exports = StringField;