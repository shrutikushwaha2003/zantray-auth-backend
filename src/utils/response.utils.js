export const successResponse = (
  res,
  { message = "Success", statusCode = 200, data = {} } = {}
) => {
  res.status(statusCode).json({
    success: true,
    message,
    ...(Object.keys(data).length && { data }),
  });
};

export const errorResponse = (res, err) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server error",
  });
};
