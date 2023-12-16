import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';

const PublicRoute = () => {
    const { loggedInUser, loading } = useUserContext();

    return (
        <>
            {!loading && (
                <>{!loggedInUser ? <Outlet /> : <Navigate to="/" />}</>
            )}
        </>
    );
};

export default PublicRoute;
