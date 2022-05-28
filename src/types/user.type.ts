export interface User {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  username: string;
  id: string;
  role: string;
  phone: number;
  profileImg: string;
  status: string;
  workspaces: [{ _id: string; name: string }];
}
