import { sessionsCollection, usersCollection } from "../database/db.js";

export async function tokenValidationMiddleware(req, res, next) {
  const authorization = req.headers.authorization;

  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send("sem token");
  }
  const session = await sessionsCollection.findOne({ token });
  if (!session) {
    return res.status(401).send("sem session");
  }
  const user = await usersCollection.findOne({ _id: session.userId });
  if (!user) {
    return res.status(401).send("sem sem user");
  }

  res.locals.user = user;

  next();
}
