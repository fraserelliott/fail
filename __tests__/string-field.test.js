const StringField = require("../fields/string-field");
const { expectWithDebug } = require("../test-utils/testUtils");

describe("StringField", () => {
    let stringField;

    beforeEach(() => {
        stringField = new StringField();
    });

    test("type check is enforced", () => {
        const result = stringField.validate("hello");
        expectWithDebug(result, (res) => {
            expect(res.valid).toBe(true);
        });

        const fail = stringField.validate(123);
        expectWithDebug(fail, (res) => {
            expect(res.valid).toBe(false);
        });
    });

    test("minLength passes for long enough string", () => {
        stringField.minLength(3);
        const result = stringField.validate("hello");
        expectWithDebug(result, (res) => {
            expect(res.valid).toBe(true);
        });
    });

    test("minLength fails for short string", () => {
        stringField.minLength(5);
        const result = stringField.validate("hi");
        expectWithDebug(result, (res) => {
            expect(res.valid).toBe(false);
            expect(res.error).toMatch(/at least 5 characters/);
        });
    });

    test("maxLength passes for short string", () => {
        stringField.maxLength(5);
        const result = stringField.validate("hi");
        expectWithDebug(result, (res) => {
            expect(res.valid).toBe(true);
        });
    });

    test("maxLength fails for long string", () => {
        stringField.maxLength(3);
        const result = stringField.validate("hello");
        expectWithDebug(result, (res) => {
            expect(res.valid).toBe(false);
            expect(res.error).toMatch(/cannot exceed 3 characters/);
        });
    });

    test("validateAll includes all string-related errors", () => {
        stringField.minLength(3).maxLength(4);
        const result = stringField.validateAll("hi");
        expectWithDebug(result, (res) => {
            expect(res.valid).toBe(false);
            expect(res.errors.length).toBeGreaterThan(0);
        });
    });

    test("fails gracefully when string is null", () => {
        stringField.minLength(2);
        const result = stringField.validate(null);
        expectWithDebug(result, (res) => {
            expect(res.valid).toBe(false);
        });
    });

    test("fails gracefully when string is undefined", () => {
        stringField.minLength(2);
        const result = stringField.validate(undefined);
        expectWithDebug(result, (res) => {
            expect(res.valid).toBe(true);
        });
    });
});