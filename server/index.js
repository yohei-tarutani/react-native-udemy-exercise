const express = require("express");
const cors = require("cors");
const verifyGoogleToken = require("./validateJwt");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3300;

app.use(cors());
app.use(express.json());

// Middleware to protect endpoints
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // retrieves the Authorization header from the request.

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Check if the Authorization header is missing or don't start with "Bearer "
    return res.status(401).json({ message: "Authorization token is required" });
    // If so, it returns a 401 Unauthorized error response.
  }

  const token = authHeader.split(" ")[1];
  // Extracts the token from the header by splitting the string with a space ("Bearer TOKEN_HERE") and taking the second part(token).

  const userData = await verifyGoogleToken(token);
  // Calls verifyGoogleToken(token) to check if the token is valid.
  // verifyGoogleToken will return user data if the token is valid, otherwise, it returns null.

  if (!userData) {
    return res.status(401).json({ message: "Invalid token" });
    // If userData is null(invalid token), 401 Unauthorized error is returned.
  }

  req.user = userData;
  // Stores the authenticated user data in req.user, making it available in the request object.
  next();
  // Calls next() to proceed to the next middleware or route handler.
};

app.get("/", auth, (req, res) => {
  res.send("Backend API is running!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
