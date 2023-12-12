import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import App from './App';
import Profile from './pages/Profile';
import PrivateRoute from './pages/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <App /> },
            { path: 'forget-password', element: <ForgotPassword /> },
            { path: 'reset-password/:token', element: <ResetPassword /> },
        ],
    },
    {
        path: '/profile',
        element: <PrivateRoute />,
        children: [{ index: true, element: <Profile /> }],
    },
]);

export default router;
