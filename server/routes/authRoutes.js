const express = require("express");

const {
  register,
  login,
  getStaff,
} = require("../controllers/authControllers");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get(
  "/staff",
  protect,
  authorize("MANAGER"),
  getStaff
);

module.exports = router;