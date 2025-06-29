const Field = require("field");

class BooleanField extends Field {
    constructor() {
        super();
        this.type("boolean");
    }

    isTrue() {
        return this.addRule("isTrue", (param) => {
            if (param) {
                return { valid: true };
            } else {
                return { valid: false, error: "must be true" };
            }
        });
    }

    isFalse() {
        return this.addRule("isFalse", (param) => {
            if (!param) {
                return { valid: true };
            } else {
                return { valid: false, error: "must be false" };
            }
        });
    }
}

module.exports = BooleanField;