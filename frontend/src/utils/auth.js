export const isAuthenticated = (user, token) => !!(user && token);

export const hasRole = (user, roles) =>
  !!(user?.role && roles.some((role) => user.role === role));
