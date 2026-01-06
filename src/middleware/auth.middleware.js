import jwt from "jsonwebtoken";

/**
 * Auth Middleware
 * Usage:
 *  auth()         → user OR admin (based on token)
 *  auth("admin")  → only admin
 *  auth("user")   → only user
 */
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

      // verify token with correct secret
      try {
        decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
      } catch {
        decoded = jwt.verify(token, process.env.USER_JWT_SECRET);
      }

      // role check
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }

      req.user = decoded; // { id, role }
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
