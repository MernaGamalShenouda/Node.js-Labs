const Ajv = require("ajv");
const ajv = new Ajv();

 let ItemsSchema = {
    type: "object",
    properties:{
        name:{type: "string", "minLength":2},
        price:{type: "integer"},
        desc:{type: "integer", "minimum":0, "maximum":100},
    },
    required:["name", "price"],
    additionalProperties:false
    }
    module.exports = ajv.compile(ItemsSchema); 
