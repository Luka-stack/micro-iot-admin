export const MACHINE_API = 'http://localhost:5000/api/machines';
export const ANALYSER_API = 'http://localhost:7000/api/analyser';

const AUTH_SERVER = 'http://localhost:5001/auth';

export const AuthEndpoints = {
  signup: `${AUTH_SERVER}/v1/signup`,
  login: `${AUTH_SERVER}/v1/login`,
};
