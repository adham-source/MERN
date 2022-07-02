const Ajv = require("ajv")
const addFormats = require("ajv-formats")

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)

const registerSchema = {
  type: "object",
  properties: {
    firstName: {
      type: "string",
      minLength: 3,
      maxLength: 30,
    },
    lastName: {
      type: "string",
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      minLength: 8,
    },
    confirmPassword: {
      type: "string",
      minLength: 8,
    },
  },
  required: ["firstName", "lastName", "email", "password"],
  additionalProperties: false,
}

const loginSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      minLength: 8,
    },
  },
  required: ["email", "password"],
  additionalProperties: false,
}

const userRegisterValidate = ajv.compile(registerSchema)
const userLoginValidate = ajv.compile(loginSchema)

module.exports = {
  userRegisterValidate,
  userLoginValidate,
}
