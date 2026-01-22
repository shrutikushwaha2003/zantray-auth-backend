const role = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized. Please login first.",
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden. You do not have permission to access this resource.",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default role;
