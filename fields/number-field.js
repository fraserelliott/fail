const Field = require("./field");

class NumberField extends Field {
    constructor() {
        super();
        this.type("number");
    }

    min(n) {
        return this.addRule("min", (param) => {
            if (param >= n) {
                return { valid: true };
            } else {
                return { valid: false, error: `must be at least ${n}.` };
            }
        });
    }

    greaterThan(n) {
        return this.addRule("greaterThan", (param) => {
            if (param > n) {
                return { valid: true };
            } else {
                return { valid: false, error: `must be greater than ${n}.` };
            }
        });
    }

    max(n) {
        return this("max", (param) => {
            if (param <= n) {
                return { valid: true };
            } else {
                return { valid: false, error: `cannot exceed ${n}.` };
            }
        });
    }

    lessThan(n) {
        return this.addRule("lessThan", (param) => {
            if (param < n) {
                return { valid: true };
            } else {
                return { valid: false, error: `must be less than ${n}.` };
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