import express from "express";
import { getUserListings, signOut, test } from "../controller/user.controller.js";
import { updateUser, deleteUser } from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/signout",signOut);
router.get("/listings/:id",verifyToken,getUserListings);

export default router;
