const { v1: uuidv1, v4: uuidv4 } = require("uuid");
const ProductSchema = require("../models/productSchema");
const ProductGroupSchema = require("../models/productGroupSchema");

const getAllProducts = async (req, res) => {
  try {
    const data = await ProductSchema.find({}, "-_id -__v");
    res.status(200).json({ status: "200", count: data?.length, data: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const setAllProducts = async (req, res) => {
  try {
    const productsArray = req.body;
    const productsWithIds = productsArray.map((product) => ({
      ...product,
      id: uuidv4(),
    }));

    if (!Array.isArray(productsArray)) {
      return res.status(400).json({
        status: "400",
        message: "Request body must be an array of products.",
      });
    }

    const addedProducts = await ProductSchema.insertMany(productsWithIds);

    res.status(201).json({
      status: "200",
      message: "Products added successfully",
      products: addedProducts,
    });
  } catch (err) {
    res.status(500).json({ status: "500", error: err.message });
  }
};

const getProductFromGroup = async (req, res) => {
  try {
    const { groupId } = req.query;
    console.log(groupId, "groupId")
    const productGroup = await ProductGroupSchema.findOne({ id: groupId }, "-_id -__v");
    const products = await ProductSchema.find({ id: { $in: productGroup?.productIds } }, "-_id -__v");
    res.status(200).json({ status: "200", count: products?.length, data: products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllProducts, setAllProducts, getProductFromGroup };
