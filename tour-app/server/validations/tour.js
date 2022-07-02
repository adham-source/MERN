const Ajv = require("ajv")

const ajv = new Ajv({ allErrors: true })
// require("ajv-formats")(ajv)

const schema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      minLength: 5,
      maxLength: 100,
    },
    description: {
      type: "string",
      minLength: 10,
      maxLength: 5000,
    },
    tags: {
      type: "array",
      minItems: 1,
      maxItems: 30,
      uniqueItems: true,
      items: { type: "string" },
    },
    imageFile: {
      type: "string",
    },
    name: {
      type: "string",
    },
  },
  required: ["title", "description", "tags", "imageFile"],
  additionalProperties: false,
}

const tourCreateValidate = ajv.compile(schema)

module.exports = {
  tourCreateValidate,
}
