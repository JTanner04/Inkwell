import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository.js";
import { assertNonEmpty, ValidationError } from "../utils/validation.js";
import { TokenService } from "./token.service.js";
import { presentUser } from "./user.presenter.js";

class EmailAlreadyRegisteredError extends Error {}
class WeakPasswordError extends Error {}
class InvalidCredentialsError extends Error {}
const MIN_PASSWORD_LENGTH = 8;

export const AuthService = {
  async register({ email, displayName, password }) {
    assertNonEmpty(email, "email", "MISSING_EMAIL");
    assertNonEmpty(displayName, "displayName", "MISSING_DISPLAY_NAME");
    assertNonEmpty(password, "password", "MISSING_PASSWORD");
    if (await UserRepository.findByEmail(email)) throw new EmailAlreadyRegisteredError();
    if (password.length < MIN_PASSWORD_LENGTH) throw new WeakPasswordError();
    let user;
    try { user = await UserRepository.create({ email, displayName, passwordHash: await bcrypt.hash(password, 10) }); }
    catch { throw new EmailAlreadyRegisteredError(); }
    return { user: presentUser(user), ...TokenService.issueTokens(user) };
  },
  async login({ email, password }) {
    const user = await UserRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) throw new InvalidCredentialsError();
    return { user: presentUser(user), ...TokenService.issueTokens(user) };
  },
};

export { EmailAlreadyRegisteredError, WeakPasswordError, InvalidCredentialsError, ValidationError };
