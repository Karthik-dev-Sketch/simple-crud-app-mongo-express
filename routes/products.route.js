import express from "express";
import {
  addProduct,
  deleteProduct,
  getActiveProducts,
  getAllProducts,
  getProductDetails,
  updateProduct,
} from "../controllers/products.controller.js";

const userRouter = express.Router();

userRouter.post("/add-product", addProduct);

userRouter.get("/all-products", getAllProducts);

userRouter.get("/products", getActiveProducts);

userRouter.get("/product/:id", getProductDetails);

userRouter.put("/product/:id", updateProduct);

userRouter.delete("/product/:id", deleteProduct);

export default userRouter;
