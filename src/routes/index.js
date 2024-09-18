const express = require("express");
const productControllers = require("./../controllers/productControllers")
const productGroupControllers = require("./../controllers/productGroupControllers")
const authControllers = require("./../controllers/authController")
const customerController = require("./../controllers/customerController")

const router = express.Router()

router.post("/login", authControllers.login)

router.get("/getAllProducts", productControllers.getAllProducts)
router.post("/setAllProducts", productControllers.setAllProducts)

router.post("/addProductGroup", productGroupControllers.addProductGroupList)
router.get("/getAllProductsGroup", productGroupControllers.getAllProductsGroupList)

router.get("/getProductFromGroup", authControllers.authenticateToken, productControllers.getProductFromGroup)

router.post("/register", customerController.addCustomer)
router.get("/getAllUsersList", customerController.getAllCustomerList)

module.exports = router;
