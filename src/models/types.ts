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
  email: any;
  _id: any;
  admin: boolean;
  role: number;
}
export interface ProjectModelInterface {
  name: string;
  priority: number;
  users: [ProjectUserInterface];
}
