export type UserState = {
  username: string | null;
  profilePicture: string | null;
};

export type LoginAction =
  | { type: 'LOGIN'; payload: { profilePicture: string; username: string } }
  | { type: 'LOGOUT' };

export interface Message {
  text: string;
  sender: string;
  picture: string;
  showPicture?: boolean;
}

export interface User {
  name: string;
}
