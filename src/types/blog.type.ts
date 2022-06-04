export interface Blog {
  blogDataHTML: string;
  blogDataRaw: [];
  createdBy: {
    _id: string;
    name: {
      firstName: string;
      lastName: string;
    };
    email: string;
    profileImg: string;
    username: string;
  };
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
  _id: string;
  workspace: string;
  createdAt: Date;
}
