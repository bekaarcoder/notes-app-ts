import { Outlet } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';
import AppNavbar from '../components/AppNavbar';

const Layout = () => {
    const { loggedInUser } = useUserContext();
    return (
        <div className="container my-4">
            <AppNavbar loggedInUser={loggedInUser} />
            <Outlet />
        </div>
    );
};

export default Layout;
