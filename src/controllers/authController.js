import { usersCollection, sessionsCollection } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  const { name, email, password } = req.body;
  try {
    const nameExists = await usersCollection.findOne({ name: name });
    const emailExists = await usersCollection.findOne({ email: email });
    if (nameExists) {
      return res.status(422).send("Esse nome já está em uso!");
    } else if (emailExists) {
      return res.status(422).send("Esse e-mail já foi cadastrado!");
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    usersCollection.insertOne({ name, email, password: hashPassword });

    res.status(201).send("Usuário cadastrado com sucesso!");
  } catch (err) {
    console.log(err);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const userExists = await usersCollection.findOne({ email });
    if (!userExists) {
      return res.status(422).send("Usuário ainda não registrado!");
    }
    const verifyPassword = bcrypt.compareSync(password, userExists.password);
    if (!verifyPassword) {
      return res.status(401).send("Senha incorreta.");
    } else {
      const token = uuid();
      await sessionsCollection.insertOne({
        userId: userExists._id,
        token: token,
      });
      res.status(200).send({
        token,
        message: "Login realizado com sucesso!",
      });
    }
  } catch (err) {
    console.log(err);
  }
}
