const ProductModel = require("../models/product-model");
const mongoose = require("mongoose");

//CRUD operations of sellerproducts

//fetch all products specifically for one seller
exports.getSellerProducts = async (req, res) => {
  await ProductModel.find({ }).exec(
    (error, products) => {
      if (error) {
        return res.status(400).json({ error });
      }
      res.status(200).json({ products });
    }
  );
};
//create new product
exports.createSellerProduct = async (req, res) => {
  const {
    productName,
    category,
    productDetails,
    unitPrice,
    quantity,
  } = req.body;

  

  try {
    const product = await ProductModel.create({
     
      productName,
      category,
      productDetails,
      unitPrice,
      quantity,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(409).json({
      success: false,
      desc: "Error in adding product",
      error: error.message,
    });
  }
};
//update specific product
exports.updateSellerproduct = async (req, res) => {
  const {
    productId,
    productName,
    category,
    productDetails,
    unitPrice,
    quantity,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId))
    return res.status(404).send(`No product with id: ${productId}`);

  

  const updatedProduct = {
    productName,
    category,
    productDetails,
    unitPrice,
    quantity,
    _id: productId,
  };

  try {
    let upProd = await ProductModel.findByIdAndUpdate(
      { _id: productId },
      updatedProduct,
      {
        new: true,
        upsert: false,
      }
    );
    res.status(200).json({ status: "Product updated successfully", upProd });
  } catch (error) {
    res.status(500).json({ status: "Internal server error", error });
  }
};
//delete specific product
exports.deleteSellerProducts = async (req, res) => {
  const { productId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId))
    return res.status(404).send(`No product with id: ${productId}`);

  try {
    await ProductModel.findByIdAndRemove(productId);
    res.status(200).json({ status: "Product deleted" });
  } catch (error) {
    res.status(500).json({ status: "Internal server error", error });
  }
};


