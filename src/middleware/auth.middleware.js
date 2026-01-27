import jwt from "jsonwebtoken";

const auth = (type = "user") => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Authorization token missing",
        });
      }

      const token = authHeader.split(" ")[1];

      let secret;

      if (type === "admin") {
        secret = process.env.ADMIN_JWT_SECRET;
      } else {
        secret = process.env.USER_JWT_SECRET;  // instructor & student both here
      }

      const decoded = jwt.verify(token, secret);

      req.user = decoded;

      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
};

export default auth;
