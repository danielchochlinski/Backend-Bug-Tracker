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
  email?: string;
  _id?: string;
  admin?: boolean;
  role?: number;
}
export interface ProjectModelInterface {
  name: string;
  priority: number;
  users: [ProjectUserInterface];
}
