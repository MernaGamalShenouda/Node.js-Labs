const UsersModel = require("../Models/UsersModel");
const bcrypt = require("bcrypt");

let Register = async (req, res)=>{
    //1)if Email??? ==> model.findOne({email: req.body.email})
    let foundUser = await UsersModel.findOne({email: req.body.email.toLowerCase()});
    //2)exist ==> "Already Exist, Please Login"
    if(foundUser) return res.send("User Already Exist, Please Login");
    //3)Not Exist ==> next ==> Add to DB
    let salt = await bcrypt.genSalt(10);
    let HashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = HashedPassword;

    req.body.email = req.body.email.toLowerCase();
    //3.1) Create Instance
    let newUser = new UsersModel(req.body);
    //3.2) .save()
    await newUser.save();
    //4)return res
    return res.json({message:"User Registerd Successfully", data: newUser});
}

let Login = async (req, res)=>{
    //user = req.body ====> {email, password}
    //0)find email
    let foundUser = await UsersModel.findOne({email: req.body.email.toLowerCase()})
    //1)if email [Not Exist] ==> "Invalid Email / Password"
    if(!foundUser) return res.send("Invalid Email / Password");
    //2)if email [exist] => next Step ==> Verify Pass
    let passTrue = await bcrypt.compare(req.body.password, foundUser.password)
    //3) Pass [false] ==> "Invalid Email / Password"
    if(!passTrue) return res.send("Invalid Email / Password");
    //4) Pass [true] ==> return res.send("Logged-In Successfully")
    return res.send("Logged-In Successfully")
}

module.exports = {
    Register,
    Login
}