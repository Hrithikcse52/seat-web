export interface Participant {
  name: {
    firstName: string;
    lastName: string;
  };
  _id: string;
  username: string;
  profileImg: string;
}

export interface Conversation {
  _id: string;
  participants: Participant[];
}

export interface Message {
  conversation: string;
  sender: string;
  receiver: string;
  message: string;
  _id: string;
  createdAt: string;
}
