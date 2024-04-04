const OrderValid = require("../Utils/OrdersValidation");
const OrdersModel = require("../Models/OrdersModel");
let O_ID = 0;
let AllOrders = [];

let GetAllOrders = async (req, res) => {
    try {
        AllOrders = await OrdersModel.find().exec();
        return res.json(AllOrders);
    } catch (error) {
        console.error("Error fetching items:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

let GetOrderByID = (req,res)=>{

    let Order_ID = req.params.id;
    let foundOrder = AllOrders.find((order)=>order.id == Order_ID);
    if(foundOrder)
        return res.status(200).json({data: foundOrder});
    else
        return res.status(200).send("Order Not Found");
}

let AddOrder = (req,res)=>{
    let newOrder = req.body;
    if(OrderValid(newOrder)){
        newOrder.id = ++O_ID;
        let newOrd = new OrdersModel(newOrder);
        newOrd.save();
        return res.status(201).json({message: "Added Successfully", data: newOrd})
    }

    return res.send(
            OrderValid.errors[0].instancePath.split("/")[1]
            +": "+ 
            OrderValid.errors[0].keyword
            +" ==> "+
            OrderValid.errors[0].message
        );
}

let UpdateOrderById = (req,res)=>{
    if(OrderValid(req.body)){
        let Ord_ID = req.params.id;
        let found = AllOrders.find((order)=>{
            if(order.id == Ord_ID){
                order.TotalPrice = req.body.totalPrice; 
                order.items = req.body.items;
                order.save();
                return order;
            }
        })
        if(found){
            return res.status(200).json({message:"Updated Successfully", data:AllOrders});
        }else{
            return res.send("Order Not Found");
        }
    }
    else{
        return res.status(404).send();
    }
}

let DeleteOrderById = async (req, res) => {
    try {
        let Ord_ID = req.params.id;
        const deletedOrder = await OrdersModel.findOneAndDelete(Ord_ID);
        
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json({ message: "Deleted", data: deletedOrder });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


module.exports = {
    GetAllOrders, 
    GetOrderByID, 
    AddOrder, 
    UpdateOrderById, 
    DeleteOrderById
};