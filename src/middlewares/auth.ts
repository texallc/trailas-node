import { RequestHandler } from "express";
import { unauthorized } from "../utils/handleError";
import { auth } from 'firebase-admin';
import { verifyIdToken } from "../repositories/firebaseAuth";
import { findOneModel } from "../repositories";
import UserModel from "../models/user";

const isAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization?.startsWith('Bearer ')) {
    unauthorized(res);
    return;
  }

  const split = authorization.split('Bearer ');

  if (split.length !== 2) {
    unauthorized(res);
    return;
  }

  const token = split[1];

  try {
    const decodedToken: auth.DecodedIdToken = await verifyIdToken(token);
    const { uid } = decodedToken;

    const user = await findOneModel({ model: UserModel, attributes: ["uid"], where: { uid } });

    if (!user) {
      unauthorized(res);
      return;
    }

    global.user = user.dataValues;

    next();
  } catch (err) {
    console.error(err);
    unauthorized(res);
  }
};

export default isAuthenticated;