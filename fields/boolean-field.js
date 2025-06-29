const Field = require("./field");

class BooleanField extends Field {
    constructor() {
        super();
        this.type("boolean");
    }

    true() {
        return this.addRule("true", (param) => {
            if (param) {
                return { valid: true };
            } else {
                return { valid: false, error: "must be true" };
            }
        });
    }

    false() {
        return this.addRule("false", (param) => {
            if (!param) {
                return { valid: true };
            } else {
                return { valid: false, error: "must be false" };
            }
        });
    }
}

module.exports = BooleanField;