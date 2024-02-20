import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import jwt from "jsonwebtoken";
import path from "path";
const __dirname = path.resolve();

const port = process.env.PORT;
const uri = process.env.MONGO_URI;
const jwtoken = process.env.JWT_SECRET;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);

app.post("/api/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, jwtoken, { expiresIn: "1h" });
  res.send({ token });
});

/*
app.get("/", (req, res) => {
  res.send("Hello World!");
});
*/

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "dist", "index.html"))
);

async function connectToMongoDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB using Mongoose");
    app.listen(port, () => {
      console.log(`App is listening on port: ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongoDB();
