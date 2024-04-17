export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  const expiresInMilliseconds = process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000; // Convert days to milliseconds
  const expirationDate = new Date(Date.now() + expiresInMilliseconds);

  const options = {
    expires: expirationDate,
    httpOnly: true,
    // Add other cookie options as needed (e.g., secure: true for HTTPS-only)
  };

  // Send the token in a cookie and user information in the response body
  res.status(statusCode)
     .cookie("token", token, options)
     .json({
        success: true,
        message: message,
        token: token,
        user: user.toObject(), // Convert Mongoose document to plain JavaScript object
     });
};
