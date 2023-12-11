import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import * as NotesApi from '../api/notesApi';
import { User } from '../models/user';

const PrivateRoute = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const user = await NotesApi.getLoggedInUser();
                setLoggedInUser(user);
            } catch (error) {
                console.error(error);
                setLoggedInUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchLoggedInUser();
    }, []);

    return (
        <>
            {!loading && <>{loggedInUser ? <Outlet /> : <Navigate to="/" />}</>}
        </>
    );
};

export default PrivateRoute;
