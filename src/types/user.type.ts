export interface User {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  username: string;
  id: string;
  role: string;
  profileImg: string;
  status: string;
  ogImage: string;
  workspaces: [{ _id: string; name: string }];
}
