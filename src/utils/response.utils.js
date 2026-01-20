export const successResponse = (
  res,
  { message = "Success", statusCode = 200, data = null } = {}
) => {
  const response = {
    success: true,
    message,
    data
  };

  // allow empty array, empty object, and null as valid responses
  if (data !== undefined && data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

export const errorResponse = (res, err) => {
  console.error("[API ERROR]:", err);

  const statusCode = err.statusCode || err.status || 500;

  const response = {
    success: false,
    message: err.message || "Internal server error",
  };

  // send stack only in development mode
  if (process.env.NODE_ENV === "development" && err.stack) {
    response.stack = err.stack;
  }

  return res.status(statusCode).json(response);
};
