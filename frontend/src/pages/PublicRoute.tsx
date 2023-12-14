import { useEffect, useState } from 'react';
import * as NotesApi from '../api/notesApi';
import { Navigate, Outlet } from 'react-router-dom';
import { User } from '../models/user';

const PublicRoute = () => {
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
            {!loading && (
                <>{!loggedInUser ? <Outlet /> : <Navigate to="/" />}</>
            )}
        </>
    );
};

export default PublicRoute;
