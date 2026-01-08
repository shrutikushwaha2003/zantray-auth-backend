import logger from "../utils/logger.js";

const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const timeMs = Date.now() - start;

    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress ||
      req.ip;

    logger.info("HTTP Request", {
      ip,
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTime: `${timeMs}ms`,
    });
  });

  next();
};

export default requestLogger;
