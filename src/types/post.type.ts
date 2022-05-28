export interface Post {
  postDataHTML: string;
  postDataRaw: [];
  createdBy: {
    _id: string;
    username: string;
    name: {
      firstName: string;
      lastName: string;
    };
    profileImg: string;
  };
  _id: string;
  likes: [];
  comments: [];
  created: Date;
}
