const express = require("express");
const router = express.Router();



//import controllers
const {
  getSellerProducts,
  createSellerProduct,
  updateSellerproduct,
  deleteSellerProducts,
} = require("../controllers/product-controller");

//routes
router.route("/add").post(createSellerProduct);
router.route("/getproducts").get(getSellerProducts);
router.route("/update").put(updateSellerproduct);
router
  .route("/delete")
  .delete(deleteSellerProducts);


module.exports = router;
