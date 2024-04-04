const express = require("express")
const router = new express.Router();
const UsersController = require("../Controllers/UsersControllers");

// ==> /api/users ==> [/api/users/signup] && [/api/users/login]

router.post("/signup", UsersController.Register);

router.post("/login", UsersController.Login);


module.exports = router;