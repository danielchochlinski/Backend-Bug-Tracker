// src/types/express/index.d.ts

import { UserModelInterface } from "../../models/types";
type UserModelInterface = {
  name: string;
  surname: string;
  email: string;
  password: string;
  _id?: string;
  verified: boolean;
  emailToken: string | null;
};
interface ParamsInterface {
  id: any;
}
// to make the file a module and avoid the TypeScript error

declare global {
  namespace Express {
    interface UserModelInterface {
      name: string;
      surname: string;
      email: string;
      password: string;
      _id?: string;
      verified: boolean;
      emailToken: string | null;
    }

    interface Request {
      user?: User;
      params: any;
    }
  }
}

// Fixes: '<file>' can't be compiled under '--isolatedModules'
