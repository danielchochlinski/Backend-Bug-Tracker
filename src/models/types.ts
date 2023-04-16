export interface UserModelInterface {
  name: string;
  surname: string;
  email: string;
  password: string;
  _id?: string;
  verified: boolean;
  emailToken: string | null;
}
export interface ProjectUserInterface {
  // email?: string;
  // _id?: string;
  // admin?: boolean;
  // role?: number;
  [key: string]: string | number | boolean;
}

export interface ProjectModelInterface {
  name: string;
  priority: number;
  users: [ProjectUserInterface];
  tickets: [TicketModelInterface];
}
export interface TicketUserInterface {
  _id: string;
}

export interface TicketModelInterface {
  [key: string]: any;
  save(): unknown;
  title: string;
  status: number;
  priority: number;
  type: number;
  assigned: [TicketUserInterface];
}
