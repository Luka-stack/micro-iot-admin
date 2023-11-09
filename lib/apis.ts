export const MACHINE_API = 'http://localhost:5000/api/machines';
export const ANALYSER_API = 'http://localhost:7000/api/analyser';

const AUTH_SERVER = 'http://localhost:5001/api';

export const AuthEndpoints = {
  signup: `${AUTH_SERVER}/signup`,
  login: `${AUTH_SERVER}/login`,
  providerLogin: (provider: string) => `${AUTH_SERVER}/login/${provider}`,
};
