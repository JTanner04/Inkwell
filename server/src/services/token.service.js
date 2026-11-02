import jwt from "jsonwebtoken";
function requiredSecret(name) { const value = process.env[name]; if (!value) throw new Error(`${name} must be configured.`); return value; }
const ACCESS_TOKEN_SECRET = requiredSecret("ACCESS_TOKEN_SECRET");
const REFRESH_TOKEN_SECRET = requiredSecret("REFRESH_TOKEN_SECRET");
const ACCESS_TOKEN_TTL = "15m"; const REFRESH_TOKEN_TTL = "7d";
export const TokenService = {
  issueTokens(user) { const payload = { sub: user.id, email: user.email }; return { accessToken: jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_TTL }), refreshToken: jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_TTL }) }; },
  verifyAccessToken(token) { return jwt.verify(token, ACCESS_TOKEN_SECRET); },
  verifyRefreshToken(token) { return jwt.verify(token, REFRESH_TOKEN_SECRET); },
};
