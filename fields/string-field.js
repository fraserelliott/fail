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
}

module.exports = StringField;