import { User } from "./user.type";

export interface Workspace {
  _id: string;
  name: string;
  description: string;
  address: string;
  membership?: {
    amount: number;
    currenct: string;
  };
  type: string;
  members: User[];
  createdBy: string;
  modifiedBy: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
