const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/roleMiddleware");
const router = express.Router();

// only admin can access this route
router.get("/admin", verifyToken, authorizeRole("admin"), (req, res) => {
  res.json({ message: "welcome admin" });
});

// both admin and manager can access this route
router.get(
  "/manager",
  verifyToken,
  authorizeRole("admin", "manager"),
  (req, res) => {
    res.json({ message: "welcome manager" });
  }
);

// all access this route
router.get(
  "/user",
  verifyToken,
  authorizeRole("admin", "manager", "user"),
  (req, res) => {
    res.json({ message: "welcome user" });
  }
);

module.exports = router;
