'use client'
import { LoginAction, UserState } from '@/lib/types';
import { createContext, useContext, useReducer, Dispatch } from 'react';
import { ReactNode } from 'react';

const UserContext = createContext<{ state: UserState; dispatch: Dispatch<LoginAction> } | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const initialState: UserState = {
  username: null,
  profilePicture: null,
};

function reducer(state: UserState, action: LoginAction): UserState {
  switch (action.type) {
    case 'LOGIN':
      return {
        username: action.payload.username,
        profilePicture: action.payload.profilePicture,
      };
    case 'LOGOUT':
      return initialState;
    default:
      throw new Error(`Unknown action: ${action}`);
  }
}

interface UserProviderProps {
    children: ReactNode;
  }
  

  
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    return (
      <UserContext.Provider value={{ state, dispatch }}>
        {children}
      </UserContext.Provider>
    );
  };