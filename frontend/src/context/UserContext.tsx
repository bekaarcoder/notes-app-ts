import { ReactNode, createContext, useEffect, useState } from 'react';
import { User } from '../models/user';
import * as NotesAPI from '../api/notesApi';

type UserContextProviderProps = {
    children: ReactNode;
};

export type UserContextType = {
    loggedInUser: User | null;
    loading: boolean;
    onLogout: () => void;
    onLogin: (user: User) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const onLogout = () => {
        localStorage.removeItem('user');
        setLoggedInUser(null);
    };

    const onLogin = (user: User) => {
        setLoggedInUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const localData = localStorage.getItem('user');
                if (localData) {
                    console.log('fetching through localstorage...');
                    setLoggedInUser(JSON.parse(localData));
                } else {
                    console.log('fetching through api...');
                    const user = await NotesAPI.getLoggedInUser();
                    localStorage.setItem('user', JSON.stringify(user));
                    setLoggedInUser(user);
                }
            } catch (error) {
                setLoggedInUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    return (
        <UserContext.Provider
            value={{ loggedInUser, loading, onLogout, onLogin }}
        >
            {children}
        </UserContext.Provider>
    );
};
