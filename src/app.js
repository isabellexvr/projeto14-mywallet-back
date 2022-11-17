import express, { json } from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import { register, login } from "./controllers/authController.js";
import dotenv from "dotenv";
dotenv.config()

const app = express();
app.use(cors());
app.use(json());

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
} catch (err) {
  console.log(err);
}

const db = mongoClient.db("myWallet");
export const usersCollection = db.collection("users");

app.post("/sign-up", register);

app.post("/sign-in", login);

app.listen(5000, () => {
  console.log("Server is running in port 5000");
});
