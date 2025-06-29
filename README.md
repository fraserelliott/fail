# Fraser's Awesome Input Library (FAIL)

https://www.npmjs.com/package/@fraserelliott/fail

A flexible, extensible schema validation library for JavaScript.\
Define rules for your fields and validate data with clean, structured error handling.

---

## 🚀 Installation

```bash
npm install @fraserelliott/fail
```

---

## ⚙️ Importing

```js
const Fail = require("@fraserelliott/fail");
const { FailSchema, StringField, BooleanField, NumberField } = Fail;
```

---

## ⚙️ Example Usage

### 1. Define a Schema

```js
const schema = new FailSchema();

schema.add("username", new StringField()
  .minLength(6)
  .maxLength(20)
  .alphanumeric()
  .required());

schema.add("email", new StringField()
  .email()
  .required());

schema.add("enabled", new BooleanField().required());
```

---

### 2. Validate Input

#### `schema.validate(params)`

Returns after the **first error is found**:

```js
{ valid: false, error: "username must be at least 6 characters." }
```

---

#### `schema.validateAll(params)`

Returns **all errors**, grouped by field:

```json
{
  "valid": false,
  "username": {
    "valid": false,
    "errors": [
      { "rule": "minLength", "error": "must be at least 6 characters" },
      { "rule": "alphanumeric", "error": "must be alphanumeric" }
    ]
  },
  "password": {
    "valid": true
  }
}
```

---

## ⚙️ Available Field Types

- `Field` – base class if you want to extend your own
- `StringField`
- `NumberField`
- `BooleanField`

---

## ⚙️ Built-in Validation Rules

Each field type supports chainable rules. For example:

### Field:
- `.required()`
- `.type(t)`
- `.nonNull`

### StringField:

- `.minLength(n)`
- `.maxLength(n)`
- `.regex(pattern)`
- `.email()`
- `.website()`
- `.alphanumeric()`

### NumberField:

- `.min(n)`
- `.max(n)`
- `.greaterThan(n)`
- `.lessThan(n)`
- `.integer()`
- `.positive()` // > 0
- `.unsigned()` // ≥ 0
- `.negative()`

### BooleanField:

- `.true()`
- `.false()`
---

## ⚙️ Custom Rules

Create your own validation rules using `.addRule(name, fn)` on any field:

```js
new StringField().addRule("startsWithF", (val) => {
  return val.startsWith("F")
    ? { valid: true }
    : { valid: false, error: "must start with 'F'" };
});
```

---

## ⚙️ Custom Fields

Create your own field by extending Field. You can add any custom rules into this and any logic in the constructor:

```js
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
}
```

---

## 📝 License

ISC © Fraser Elliott

---

## Find me elsewhere

http://fraserdev.uk/
Discord: frasernotfrasier