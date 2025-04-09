import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/products.route.js";

const app = express();

app.use(express.json());
app.use("/", userRouter);
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

mongoose
  .connect(
    "mongodb+srv://karthiks:fLZz8LUJOLTjo5jT@simplecrudbackend.yuqdpni.mongodb.net/Node-API?retryWrites=true&w=majority&appName=SimpleCrudBackend"
  )
  .then(() => {
    console.log("Mongo DB connected.");
    app.listen(PORT, () => console.log(`Server Running on port => ${PORT}`));
  })
  .catch((err) => console.log("Error in connecting the MongoDB", err));
