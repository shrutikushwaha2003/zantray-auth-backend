import jwt from "jsonwebtoken";
import CustomError from "../utils/CustomError.js";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new CustomError("Unauthorized", 401);

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    throw new CustomError("Invalid token", 401);
  }
};

export default authMiddleware;
