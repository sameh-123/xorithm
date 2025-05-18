export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export type ServerStatus = 'Up' | 'Down' | 'Degraded';

export interface Server {
  id: string;
  name: string;
  ip: string;
  status: ServerStatus;
  responseTime: string;
  uptime: string;
  lastChecked: string;
  history: {
    timestamp: string;
    status: ServerStatus;
  }[];
}
