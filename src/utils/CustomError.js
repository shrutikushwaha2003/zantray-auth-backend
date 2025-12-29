class CustomError extends Error {
  constructor(message, statusCode = 500, errorCode = null) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

export default CustomError;
