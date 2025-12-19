import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signup = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw "All fields required";
  }

  const exist = await User.findOne({ email });
  if (exist) throw "User already exists";

  const hash = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hash,
  });
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw "Invalid credentials";

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw "Invalid credentials";

  return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
};

export default { signup, login };
