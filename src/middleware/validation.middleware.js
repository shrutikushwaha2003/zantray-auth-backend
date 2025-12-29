import { validationResult } from "express-validator";
import CustomError from "../utils/CustomError.js";

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CustomError(errors.array()[0].msg, 400);
  }
  next();
};

export default validate;
