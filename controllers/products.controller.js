import Product from "../models/product.model.js";
import { handleMongooseError } from "../utils/errorHandler.js";

export const getActiveProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.send({ products, count: products?.length });
  } catch (error) {
    handleMongooseError(error, res);
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.send(product);
  } catch (error) {
    handleMongooseError(error, res);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.send({ products, count: products?.length });
  } catch (error) {
    handleMongooseError(error, res);
  }
};

export const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.send(product);
  } catch (error) {
    handleMongooseError(error, res);
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const response = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (response) {
      res.send({ message: "Product Updated Successfully", product: response });
    } else {
      res
        .status(404)
        .send({ message: "Product not found for given id or update failed." });
    }
  } catch (error) {
    handleMongooseError(error, res);
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).send({ message: "Product Not Found." });
    }

    if (!product.isActive) {
      return res.status(400).send({ message: "Product already deleted." });
    }

    const deletedProduct = await Product.findByIdAndUpdate(id, { isActive });

    if (deletedProduct) {
      const plainObject = deletedProduct.toObject();
      delete plainObject.isActive;
      return res.send({
        message: "Product Deleted SuccessFully",
        product: plainObject,
      });
    } else {
      return res
        .status(404)
        .send({ message: "Product not found for the give id." });
    }
  } catch (error) {
    handleMongooseError(error, res);
  }
};
