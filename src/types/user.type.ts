export interface User {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  id: string;
  role: string;
  phone: number;
  status: string;
  workspaces: [{ _id: string; name: string }];
}
