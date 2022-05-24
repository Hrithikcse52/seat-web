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
  };
  _id: string;
  workspace: string;
  createdAt: Date;
}
