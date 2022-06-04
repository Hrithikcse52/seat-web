export interface User {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  username: string;
  _id: string;
  role: string;
  profileImg: string;
  status: string;
  ogImage: string;
  workspaces: [{ _id: string; name: string }];
}
