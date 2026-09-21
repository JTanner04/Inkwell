// Keep persistence-only fields, especially password hashes, out of API responses.
export function presentUser(user) { return { id: user.id, email: user.email, displayName: user.displayName }; }
