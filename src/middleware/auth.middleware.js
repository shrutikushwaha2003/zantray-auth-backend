import jwt from "jsonwebtoken";

const auth = (requiredRole = null) => {
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
      let decoded;

      if (requiredRole === "admin") {
        decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
      } else if (requiredRole === "user") {
        decoded = jwt.verify(token, process.env.USER_JWT_SECRET);
      } else {
        try {
          decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
        } catch {
          decoded = jwt.verify(token, process.env.USER_JWT_SECRET);
        }
      }

      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({
          success: false,
          message: `Access denied for role ${decoded.role}`,
        });
      }

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
