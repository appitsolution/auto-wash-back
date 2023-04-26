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
export default router;
