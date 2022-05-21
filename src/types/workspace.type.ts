interface PermType {
  user:
    | {
        name: {
          firstName: string;
          lastName: string;
        };
        email: string;
        id: string;
      }
    | string;
  role: string;
}

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
  permission: PermType[];
  createdBy: string;
  modifiedBy: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
