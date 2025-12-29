const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const timeMs = Date.now() - start;

    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress ||
      req.ip;

    console.log({
      ip,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      timeMs,
    });
  });

  next();
};

export default requestLogger;
