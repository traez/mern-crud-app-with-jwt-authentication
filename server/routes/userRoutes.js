import express from "express";
const router = express.Router();
import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  singleUser,
} from "../controllers/userControllers.js";
import verifyToken from "../middleware/verifyToken.js";

// Get all users
router.get("/", getUsers);

// Create a new user
router.post("/", createUser);

// Delete a user by ID (restricted to admin)
router.delete("/:id", verifyToken, (req, res) => {
  deleteUser(req, res);
});

// Update a user by ID (restricted to admin)
router.put("/:id", verifyToken, (req, res) => {
  updateUser(req, res);
});

router.get("/:id", singleUser)

export default router;

/*
import 
*/
