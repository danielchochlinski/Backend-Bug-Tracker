export interface UserModelInterface {
  name: string;
  surname: string;
  email: string;
  password: string;
  _id?: string;
  verified: boolean;
  emailToken: string | null;
  invitations: [string];
}
export interface ProjectUserInterface {
  // email?: string;
  // _id?: string;
  // admin?: boolean;
  // role?: number;
  [key: string]: string | number | boolean;
}
export interface PendingUserInterface {
  email: string;
}
export interface ProjectModelInterface {
  name: string;
  priority: number;
  users: [ProjectUserInterface];
  tickets: [TicketModelInterface];
  pendingUsers: [PendingUserInterface];
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

export interface OrganizationModelInterface {
  name: string;
  projects: [ProjectModelInterface];
  
}
