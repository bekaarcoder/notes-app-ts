import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
import router from './routes.tsx';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <UserContextProvider>
            <RouterProvider router={router} />
        </UserContextProvider>
    </React.StrictMode>
);
