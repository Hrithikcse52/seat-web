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
  likes: [
    {
      _id: string;
      username: string;
      name: {
        firstName: string;
        lastName: string;
      };
      profileImg: string;
    }
  ];
  comments: [
    {
      user: {
        _id: string;
        username: string;
        name: {
          firstName: string;
          lastName: string;
        };
        profileImg: string;
      };
      message: string;
    }
  ];
  created: Date;
}
