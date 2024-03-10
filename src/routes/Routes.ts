import express from "express";
import { checkUser } from "../middlewares/authMiddleware";
import {
  login,
  profileImage,
  register,
  userData,
} from "../controllers/authController";
import {
  addData,
  deleteData,
  listData,
  updateData,
  updatePinned,
} from "../controllers/todoController";
import { uploadMulter } from "../middlewares/multer";
const router = express.Router();

router.post("/", checkUser);

router.post("/register", register);
router.post("/login", login);

router.get("/listData", listData);
router.post("/addData", addData);
router.patch("/updatePinned/:id", updatePinned);
router.delete("/deleteData/:id", deleteData);
router.put("/updateData/:id", updateData);

router.get("/userData/:id", userData);
router.post("/profileImage/:id", uploadMulter.single("image"), profileImage);

export default router;
