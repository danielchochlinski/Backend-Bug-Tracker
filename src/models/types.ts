export interface UserModelInterface {
  name: string;
  surname: string;
  email: string;
  password: string;
  _id?: string;
  verified: boolean;
  emailToken: string | null;
}
