export const MACHINE_API = 'http://localhost:5000/api/machines';
export const ANALYSER_API = 'http://localhost:7000/api/analyser';

const AUTH_SERVER = 'http://localhost:5001/api';
const MACHINE_SERVER = 'http://localhost:5000/api';

export const AuthEndpoints = {
  signup: `${AUTH_SERVER}/signup`,
  login: `${AUTH_SERVER}/login`,
  providerLogin: (provider: string) => `${AUTH_SERVER}/login/${provider}`,
  employees: `${AUTH_SERVER}/employees`,
};

export const MiscEndpoints = {
  filters: `${MACHINE_SERVER}/misc/filters`,
};

export const MachineEndpoints = {
  filter: (query: string) => `${MACHINE_SERVER}/machines?${query}`,

  machine: (serialNumber: string) =>
    `${MACHINE_SERVER}/machines/${serialNumber}`,

  updateMachine: (serialNumber: string) =>
    `${MACHINE_SERVER}/machines/${serialNumber}`,

  changePriority: (serialNumber: string) =>
    `${MACHINE_SERVER}/machines/${serialNumber}/priority`,

  reportDefect: (serialNumber: string) =>
    `${MACHINE_SERVER}/machines/${serialNumber}/report-defect`,

  assignEmployee: (serialNumber: string) =>
    `${MACHINE_SERVER}/machines/${serialNumber}/assign-employee`,
};
