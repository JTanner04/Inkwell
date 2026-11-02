import { logger } from "../lib/logger.js";

export function errorHandler(err, req, res, next) {
  logger.error({ err, method: req.method, path: req.path }, "Unhandled request error");
  const isProd = process.env.NODE_ENV === "production";
  res.status(err.status || 500).json({ error: { code: err.code || "INTERNAL_ERROR", message: isProd ? "Something went wrong." : err.message } });
}
