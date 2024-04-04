const ItemValid = require("../Utils/ItemsValidation");
const ItemsModel = require("../Models/ItemsModel");
let I_ID = 0;
let AllItems = [];

let GetAllItems = async (req, res) => {
    try {
        AllItems = await ItemsModel.find().exec();
        return res.json(AllItems);
    } catch (error) {
        console.error("Error fetching items:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
let GetItemByID = (req,res)=>{

    let Item_ID = req.params.id;
    let foundItem = AllItems.find((item)=>item.id == Item_ID);

    if(foundItem)
        return res.status(200).json({data: foundItem});
    else
        return res.status(200).send("Item Not Found");
}

let AddItem = (req,res)=>{
    let newItem = req.body;
    if(ItemValid(newItem)){
        newItem.id = ++I_ID;
        let newItm = new ItemsModel(newItem);
        newItm.save();
        return res.status(201).json({message: "Added Successfully", data: newItm})
    }

    return res.send(
            ItemValid.errors[0].instancePath.split("/")[1]
            +": "+ 
            ItemValid.errors[0].keyword
            +" ==> "+
            ItemValid.errors[0].message
        );
}

let UpdateItemById = (req,res)=>{
    if(ItemValid(req.body)){
        let Ord_ID = req.params.id;
        let found = AllItems.find((item)=>{
            if(item.id == Ord_ID){
                item.name = req.body.name; 
                item.price = req.body.price;
                item.desc = req.body.desc;
                item.save();
                return item;
            }
        })
        if(found){
            return res.status(200).json({message:"Updated Successfully", data:AllItems});
        }else{
            return res.send("Item Not Found");
        }
    }
    else{
        return res.status(404).send();
    }
}

let DeleteItemById = async (req, res) => {
    try {
        let Itm_ID = req.params.id;
        
        const deletedItem = await ItemsModel.findOneAndDelete(Itm_ID);
        
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        return res.status(200).json({ message: "Deleted", data: deletedItem });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

module.exports = {
    GetAllItems, 
    GetItemByID, 
    AddItem, 
    UpdateItemById, 
    DeleteItemById
};