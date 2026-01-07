import winston from "winston";
 
// Get the current timestamp in IST (Indian Standard Time)
const ISTTime = () => {
  const offset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes offset
  return new Date(Date.now() + offset).toISOString().replace("T", " ").replace("Z", "");
};
 
// Custom pretty format that prints the main log line and pretty-prints metadata (if any)
const prettyFormat = winston.format.printf(({ timestamp, level, message, ...metadata }) => {
  let metaString = "";
  if (Object.keys(metadata).length > 0) {
    metaString = "\n" + JSON.stringify(metadata, null, 2);
  }
  return `${timestamp} [${level}]: ${message}${metaString}`;
});
 
const logger = winston.createLogger({
  level: "info",
  transports: [
    // Console transport with colored log level only
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: ISTTime }),
        winston.format.colorize({ all: false }), // Colors only the level
        prettyFormat
      )
    }),
    // File transport with the same pretty format (no color)
    new winston.transports.File({
      filename: "cron-job.log",
      format: winston.format.combine(
        winston.format.timestamp({ format: ISTTime }),
        prettyFormat
      )
    })
  ]
});
export default logger;