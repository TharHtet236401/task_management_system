import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path"

dotenv.config();
import { fError, fMsg } from "./libby.js";



//validate the body with schema
export const validateBody = (schema) => {
  return (req, res, next) => {
    let result = schema.validate(req.body);

    if (result.error) {
      if (req.file) {
        const oldFilePath = path.join(__dirname, "..", req.file.path);
        deleteFile(oldFilePath);
      }
      next(new Error(result.error.details[0].message));
    } else {
      next();
    }
  };
};

//validate the token with jwt and attach the user info to the request body
export let validateToken = () => {
  return async (req, res, next) => {
    if (!req.headers.authorization) {
      return fError(res, "Unauthorized", 401);
    }

    let token = req.headers.authorization.split(" ")[1];
    console.log(token);
    try {
      const tokenUser = jwt.verify(token, process.env.JWT_SECRET);
      req.user = tokenUser.id;
      next();
    } catch (error) {
      return next(new Error("Invalid token"));
    }
  };
};

