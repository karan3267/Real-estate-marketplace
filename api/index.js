import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import signupRoute from "./routes/auth.routes.js";
import listingRoute from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });
const __dirname = path.resolve();
const app = express();
const port = "3000";

app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
  console.log("server is running on port: " + port);
});

app.use("/api/user", userRoutes);
app.use("/api/auth", signupRoute);
app.use("/api/listing", listingRoute);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Serever Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
