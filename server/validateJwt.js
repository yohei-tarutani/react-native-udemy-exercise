const { OAuth2Client } = require("google-auth-library");
// Imports the "google-auth-library" package, which allows us to interact with Google’s authentication system.
// Extracts the OAuth2Client class from the library. This class helps us verify Google ID tokens (JWTs).

const client = new OAuth2Client();
// Creates an instance of the OAuth2Client class. This client allows us to call Google APIs and verify ID tokens.
// Since we are only verifying tokens and not making API requests, we don’t need to specify a Client ID.

const verifyGoogleToken = async (token) => {
  // This function makes a network request to Google’s servers to verify the token.
  // (token) parameter is the Google ID token (JWT) received from the frontend.
  // The function will return either the user’s data or null (if invalid).
  try {
    const ticket = await client.verifyIdToken({
      // Calls Google’s API to verify the ID token of the client.
      idToken: token,
      audience: null,
      // No need to specify CLIENT_ID, works for all Google tokens
      // Normally, this should be set to a Google Client ID to ensure the token is meant for a specific app. But here, 'null' allows verification for all Google-issued tokens.
    });

    const payload = ticket.getPayload();
    return payload;
    // Extracts the decoded user information from the verified token.
    // Returns user info like email, name, picture, sub (user ID)
  } catch (error) {
    console.error("Invalid Google token:", error);
    return null;
  }
};

module.exports = verifyGoogleToken; // Export the Function
