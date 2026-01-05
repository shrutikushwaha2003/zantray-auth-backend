import jwt from "jsonwebtoken";

/**
 * Generic Auth Middleware
 * Usage:
 *  auth()               → user OR admin (both allowed)
 *  auth("admin")        → only admin
 *  auth("user")         → only user
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
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // decoded = { id, role }

      //  Role check (if required)
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
