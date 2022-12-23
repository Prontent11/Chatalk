const express = require("express");
const { registerUser, authUser } = require("../controllers/user-controllers");

const router = express.Router();

// router.get() for single request

//router.rout('/').get().post()  so router.rout for chaining mulitple requests

router.route("/register").post(registerUser);
router.post("/login", authUser);

module.exports = router;
