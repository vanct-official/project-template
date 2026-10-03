export const authenticationCommands = [
  {
    id: "jsonwebtoken",
    name: "JSON Web Token (JWT)",
    category: "Authentication",
    technology: "Node.js / Security",
    description: "An implementation of JSON Web Tokens to sign and verify tokens for user auth.",
    link: "https://jwt.io/introduction",
    type: "install",
    commands: [
      "npm install jsonwebtoken"
    ],
    tags: ["jwt", "token", "auth", "authentication", "security", "sessions"]
  },
  {
    id: "bcryptjs",
    name: "bcryptjs",
    category: "Authentication",
    technology: "Node.js / Cryptography",
    description: "Optimized bcrypt in JavaScript with zero native dependencies for hashing passwords.",
    link: "https://www.npmjs.com/package/bcryptjs",
    type: "install",
    commands: [
      "npm install bcryptjs"
    ],
    tags: ["bcrypt", "bcryptjs", "password", "hash", "salt", "security"]
  },
  {
    id: "google-auth-library",
    name: "Google OAuth Library",
    category: "Authentication",
    technology: "Node.js / Google Cloud",
    description: "Google's officially supported Node.js client library for OAuth 2.0 and ID token verification.",
    link: "https://cloud.google.com/nodejs/docs/reference/google-auth-library/latest",
    type: "install",
    commands: [
      "npm install google-auth-library"
    ],
    tags: ["google", "oauth", "auth", "sso", "identity", "social-login"]
  }
];

export default authenticationCommands;
