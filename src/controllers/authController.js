import { usersCollection, sessionsCollection } from "../app.js";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const token = uuid();

const userSchema = joi.object({
  name: joi.string().required().min(3),
  email: joi.string().email().required(),
  password: joi.string().required().min(4),
});

export async function register(req, res) {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.send(errors);
  }
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

export async function login(req, res) {
  const { name, password } = req.body;

  try {
    const userExists = await usersCollection.findOne({ name: name });
    if (!userExists) {
      return res.status(422).send("Usuário ainda não registrado!");
    }
    const verifyPassword = bcrypt.compareSync(password, userExists.password);
    if (!verifyPassword) {
      return res.status(401).send("Senha incorreta.");
    } else {
      await sessionsCollection.insertOne({
        userId: userExists._id,
        token,
      });
      res.status(200).send("Login feito com sucesso!");
    }
  } catch (err) {
    console.log(err)
  }
}
