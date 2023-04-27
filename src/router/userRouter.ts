import { Router } from "express";
import {
  addAuto,
  changeEmail,
  changeName,
  changePhone,
  deleteUser,
  checkCode,
  login,
  verify,
  payment,
} from "../service/user";
const router = Router();

router.post("/change-phone", changePhone);
router.post("/change-name", changeName);
router.post("/change-email", changeEmail);
router.post("/add-auto", addAuto);
router.post("/delete", deleteUser);
router.post("/check-code", checkCode);
router.post("/login", login);
router.post("/verify", verify);
router.get("/payment", payment);
router.post("/payment", payment);
router.patch("/payment", payment);
export default router;
