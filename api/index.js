import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.MONGO)
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const port = "3000";

app.listen(port, () => {
  console.log("server is running on port: " + port);
});
