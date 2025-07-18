const { FailSchema, Field, StringField, BooleanField, NumberField } = require("../fail-schema");
const { expectWithDebug } = require("../test-utils/testUtils");

describe("FailSchema", () => {
    let schema;

    beforeEach(() => {
        schema = new FailSchema();
        const usernameField = new StringField()
            .required()
            .minLength(3)
            .maxLength(10);

        schema.add("username", usernameField);
    });

    test("validates correct parameters successfully", () => {
        const result = schema.validate({ username: "validuser" });
        expectWithDebug(result, (res) => {
            expect(res.valid).toBe(true);
        });
    });

    test("fails validation for missing required parameter", () => {
        const result = schema.validate({});
        expectWithDebug(result, (res) => {
            expect(res.valid).toBe(false);
            expect(res.error).toMatch(/username.*mandatory/);
        });
    });

    test("fails validation for short username", () => {
        const result = schema.validate({ username: "ab" });
        expectWithDebug(result, (res) => {
            expect(res.valid).toBe(false);
            expect(res.error).toMatch(/at least 3 characters/);
        });
    });

    test("validateAll returns all rule errors", () => {
        const result = schema.validateAll({ username: "" });
        expectWithDebug(result, (res) => {
            expect(res.valid).toBe(false);
            expect(res.username.errors.length).toBeGreaterThan(0);
        });
    });

    test("throws for non-object params in validate()", () => {
        expect(() => schema.validate(null)).toThrow(/params.*non-null object/);
    });

    test("throws for malformed validator result", () => {
        const badValidator = {
            validate: () => "not-an-object"
        };
        schema.fields = new Map([["test", badValidator]]);
        expect(() => schema.validate({ test: "value" }))
            .toThrow(/must return a non-null object/);
    });

    test("validateAll returns per-field valid:true for passing fields", () => {
        const result = schema.validateAll({ username: "validname" });
        expectWithDebug(result, (res) => {
            expect(res.valid).toBe(true);
            expect(res.username.valid).toBe(true);
        });
    });

    test("throws when adding non-Field as validator", () => {
        expect(() => schema.add("bad", {}))
            .toThrow("validator parameter must be a non-null instance");
    });

    test("throws when adding invalid param name", () => {
        const validator = new StringField();
        expect(() => schema.add("", validator))
            .toThrow("param parameter must be a non-empty string.");
    });

    test("validateAll throws if validator result is null", () => {
        const badValidator = {
            validateAll: () => null
        };
        schema.fields = new Map([["broken", badValidator]]);
        expect(() => schema.validateAll({ broken: "test" }))
            .toThrow(/must return a non-null object/);
    });

    test("validateAll throws if invalid error format", () => {
        const badValidator = {
            validateAll: () => ({
                valid: false,
                errors: [{ rule: 123, error: {} }]
            })
        };
        schema.fields = new Map([["bad", badValidator]]);
        expect(() => schema.validateAll({ bad: "input" }))
            .toThrow(/must be an object with string 'rule' and 'error'/);
    });
});