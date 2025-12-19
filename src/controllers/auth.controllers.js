import authService from "../services/auth.service.js";

export const signup = async (req, res) => {
  try {
    await authService.signup(req.body);
    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const login = async (req, res) => {
  try {
    const token = await authService.login(req.body);
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
