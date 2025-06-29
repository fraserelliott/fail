const Field = require("../fields/field");
const { expectWithDebug } = require("../test-utils/testUtils");

describe("Field", () => {
    let field;

    beforeEach(() => {
        field = new Field();
    });

    test("passes validation with required rule", () => {
        field.required();
        const result = field.validate("value");
        expectWithDebug(result, (res) => {
            expect(res.valid).toBe(true);
        }, "required field result");
    });

    test("fails validation when required param is missing", () => {
        field.required();
        const result = field.validate(undefined);
        expectWithDebug(result, (res) => {
            expect(res.valid).toBe(false);
            expect(res.error).toBe("is mandatory");
        });
    });

    test("type rule passes for correct type", () => {
        field.type("string");
        const result = field.validate("hello");
        expectWithDebug(result, (res) => {
            expect(res.valid).toBe(true);
        });
    });

    test("type rule fails for incorrect type", () => {
        field.type("string");
        const result = field.validate(123);
        expectWithDebug(result, (res) => {
            expect(res.valid).toBe(false);
            expect(res.error).toMatch(/must be of type string/);
        });
    });

    test("nonNull rule fails for null", () => {
        field.nonNull();
        const result = field.validate(null);
        expectWithDebug(result, (res) => {
            expect(res.valid).toBe(false);
        });
    });

    test("validateAll returns all errors", () => {
        field.type("string").nonNull().required();
        const result = field.validateAll(null);
        expectWithDebug(result, (res) => {
            expect(res.valid).toBe(false);
            expect(res.errors.length).toBeGreaterThan(0);
        });
    });

    test("throws for invalid rule function", () => {
        expect(() => field.addRule("bad", null)).toThrow("Parameter fn must be a function.");
    });

    // Edge case test
    test("validateAll returns valid:true and no errors for undefined optional field", () => {
        field.type("string");
        const result = field.validateAll(undefined);
        expectWithDebug(result, (res) => {
            expect(res.valid).toBe(true);
            expect(res.errors).toBeUndefined();
        });
    });
});