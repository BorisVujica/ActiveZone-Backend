import express from "express";
import auth from "../middleware/authMiddleware.js";

import {
  getPhone,
  savePhone,
  runSecurityCheck
} from "../controllers/securityController.js";

const router = express.Router();


router.get("/phone", auth, getPhone);


router.put("/phone", auth, savePhone);


router.post("/check", auth, runSecurityCheck);

export default router;