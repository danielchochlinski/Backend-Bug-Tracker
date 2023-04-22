// src/types/express/index.d.ts

import { ProjectModelInterface, UserModelInterface } from "../../models/types";
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
  id: string;
}
// to make the file a module and avoid the TypeScript error

declare global {
  namespace Express {
    interface Request {
      user?: User;
      params?: string;
      projects?: ProjectModelInterface;
      projectTasks?: [string];
    }
  }
}

// Fixes: '<file>' can't be compiled under '--isolatedModules'
