export const TOKEN_KEY = "auth_token";
export const USER_KEY = "auth_user";

export function loadPersistedAuth() {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const raw = localStorage.getItem(USER_KEY);
    if (!token || !raw) return null;
    const user = JSON.parse(raw);
    return { token, user };
  } catch {
    return null;
  }
}

export function savePersistedAuth({ user, token }) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearPersistedAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
