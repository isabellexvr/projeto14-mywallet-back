import { registriesCollection, sessionsCollection } from "../database/db.js";
import dayjs from "dayjs";

export async function getRegistries(req, res) {
  const user = res.locals.user;
  try {
    const userRegistries = await registriesCollection
      .find({ userId: user._id })
      .toArray();
    res.status(201).send(userRegistries);
  } catch (err) {
    console.log(err);
  }
}

export async function postRegistry(req, res) {
  const user = res.locals.user;
  const registry = {
    date: `${dayjs().date()}/${dayjs().month() + 1}`,
    userId: user._id,
    ...req.body,
  };
  try {
    await registriesCollection.insertOne(registry);
    res.status(201).send("Registro postado!");
  } catch (err) {
    console.log(err);
  }
}
