module.exports = {
  "main": {
    "input": "./src/shared/api/schema.yaml",
    "output": {
      "target": "./src/shared/api/generated.ts",
      "override": {
        "mutator": {
          "path": "./src/shared/api/api-instance.ts",
          "name": "createApiInstance"
        }
      },
    },
  }
}