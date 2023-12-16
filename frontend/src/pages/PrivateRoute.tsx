import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';

const PrivateRoute = () => {
    const { loggedInUser, loading } = useUserContext();

    return (
        <>
            {!loading && <>{loggedInUser ? <Outlet /> : <Navigate to="/" />}</>}
        </>
    );
};

export default PrivateRoute;
