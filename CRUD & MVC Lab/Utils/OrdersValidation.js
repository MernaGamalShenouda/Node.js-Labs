const Ajv = require("ajv");
const ajv = new Ajv();

let OrdersSchema = {
    type: "object",
    properties:{
        "TotalPrice": { "type": "number" },
        "items": {
            "type": "array",
            "items": { "type": "integer" }
        }
    },
    required:["TotalPrice", "items"],
    additionalProperties:false
    }
    module.exports = ajv.compile(OrdersSchema); 
