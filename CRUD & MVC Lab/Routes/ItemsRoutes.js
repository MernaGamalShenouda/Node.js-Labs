const express = require("express");
const routes = new express.Router();
const Item_Con = require("../Controllers/ItemsControllers");

routes.get("/",Item_Con.GetAllItems)
routes.get("/:id",Item_Con.GetItemByID)
routes.post("/",Item_Con.AddItem)
routes.put("/:id",Item_Con.UpdateItemById)
routes.delete("/:id",Item_Con.DeleteItemById)

module.exports = routes;
