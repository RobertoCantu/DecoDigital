function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}
  
const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    products: path(ROOTS_DASHBOARD, '/products'),
    clientInfo: path(ROOTS_DASHBOARD, '/client_info'),
    clientAccount: path(ROOTS_DASHBOARD, '/client_account')
  }
};