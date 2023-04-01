import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);


try {
  await mongoClient.connect();
} catch (err) {
  console.log(err);
}

const db = mongoClient.db("myWallet");

export const sessionsCollection = db.collection("sessions");
export const usersCollection = db.collection("users");

export const registriesCollection = db.collection("registries");