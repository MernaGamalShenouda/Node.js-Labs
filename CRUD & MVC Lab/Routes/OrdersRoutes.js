const express = require("express");
const routes = new express.Router();
const Ord_Con = require("../Controllers/OrdersControllers");

 routes.get("/",Ord_Con.GetAllOrders)
routes.get("/:id",Ord_Con.GetOrderByID)
routes.post("/",Ord_Con.AddOrder)
routes.put("/:id",Ord_Con.UpdateOrderById)
routes.delete("/:id",Ord_Con.DeleteOrderById)

module.exports = routes;
