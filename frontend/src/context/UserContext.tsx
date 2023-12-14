import { ReactNode, createContext } from 'react';
import { User } from '../models/user';

interface UserContextProviderProps {
    children: ReactNode;
}

interface UserContext {
    loggedInUser: User;
}

export const UserContext = createContext<UserContext | null>(null);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    return <UserContext.Provider value={}>{children}</UserContext.Provider>;
};
