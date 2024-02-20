export type UserState = {
    username: string | null;
    profilePicture: string | null;
  };
  
  export type LoginAction =
    | { type: 'LOGIN'; payload: { profilePicture: string; username: string } }
    | { type: 'LOGOUT' };