# Fraser's Awesome Input Library (FAIL)

https://www.npmjs.com/package/@fraserelliott/fail

A flexible, extensible schema validation library for JavaScript.\
Define rules for your fields and validate data with clean, structured error handling.
Use FAIL before you fail.

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

## ⚙️ Using the `dist` Folder for Frontend

The `dist` folder contains the bundled and minified ES module build of the library (fail.esm.js) suitable for browser usage.

To use it in your frontend project, you can copy the file to your public/static folder as part of your build process. For example, in your package.json scripts:

```json
{
  "scripts": {
    "copy-lib": "cp ./node_modules/@fraserelliott/fail/dist/fail.esm.js ./public/libs/",
    "build": "npm run copy-lib && your-other-build-steps"
  }
}
```

Then in your frontend JavaScript:

```js
import { FailSchema, StringField } from './libs/fail.esm.js';

// Use your validation schema as normal
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

## Using `validateAllWithCallback` for Fine-Grained Validation Feedback

`validateAllWithCallback(params, callback, ruleMap)` allows you to attach metadata (e.g., element IDs) to validation rules and update UI elements dynamically.

### Example `ruleMap` with element IDs:

```js
const ruleMap = {
  "username-length": {
    elementId: "p-username-length",
    rules: [
      { field: "username", rule: "minLength" },
      { field: "username", rule: "maxLength" }
    ]
  },
  "password-specialChar": {
    elementId: "p-password-special",
    rules: [
      { field: "password", rule: "regex" }
    ]
  }
};
```

### Example callback to toggle error classes on elements with above `ruleMap`:

```js
const callback = (key, errors, meta) => {
  const el = document.getElementById(meta.elementId);
  if (!el) return;

  if (errors.length === 0) {
    el.classList.remove("error-visible");
  } else {
    el.classList.add("error-visible");
  }
};

// Usage
schema.validateAllWithCallback(formData, callback, ruleMap);
```

---

## ⚙️ Available Field Types

- `Field` – base class if you want to extend your own
- `StringField`
- `NumberField`
- `BooleanField`

---

## ⚙️ Built-in Validation Rules

Each field type supports chainable rules.

### Field:
- `.required()`
- `.type(t)`
- `.nonNull()`

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
- `.positive()` (> 0)
- `.unsigned()` (≥ 0)
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