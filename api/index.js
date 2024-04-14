import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js'
import signupRoute from './routes/singup.route.js'
dotenv.config();
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

app.use(express.json());

app.listen(port, () => {
  console.log("server is running on port: " + port);
});

app.use("/api/user",userRoutes);
app.use("/api/auth",signupRoute);

