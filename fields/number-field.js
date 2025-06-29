const Field = require("./field");

class NumberField extends Field {
    constructor() {
        super();
        this.type("number");
    }

    min(x) {
        return this.addRule("min", (param) => {
            if (param >= min) {
                return { valid: true };
            } else {
                return { valid: false, error: `must be at least ${x}.` };
            }
        });
    }

    greaterThan(x) {
        return this.addRule("greaterThan", (param) => {
            if (param > min) {
                return { valid: true };
            } else {
                return { valid: false, error: `must be greater than ${x}.` };
            }
        });
    }

    max(x) {
        return this("max", (param) => {
            if (param <= max) {
                return { valid: true };
            } else {
                return { valid: false, error: `cannot exceed ${x}.` };
            }
        });
    }

    lessThan(x) {
        return this.addRule("lessThan", (param) => {
            if (param < min) {
                return { valid: true };
            } else {
                return { valid: false, error: `must be less than ${x}.` };
            }
        });
    }

    integer() {
        return this.addRule("integer", (param) => {
            if (Number.isInteger(param)) {
                return { valid: true };
            } else {
                return { valid: false, error: `must be an integer.` };
            }
        });
    }

    positive() {
        return this.addRule("positive", (param) => {
            if (param > 0) {
                return { valid: true };
            } else {
                return { valid: false, error: `must be >0.` };
            }
        });
    }

    unsigned() {
        return this.addRule("unsigned", (param) => {
            if (param >= 0) {
                return { valid: true };
            } else {
                return { valid: false, error: `must be >=0.` };
            }
        });
    }

    negative() {
        return this.addRule("negative", (param) => {
            if (param < 0) {
                return { valid: true };
            } else {
                return { valid: false, error: `must be negative.` };
            }
        });
    }
}

module.exports = NumberField;