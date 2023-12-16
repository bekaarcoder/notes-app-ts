import { User } from '../models/user';
import { GiNotebook } from 'react-icons/gi';
import AuthNavbarItem from './AuthNavbarItem';
import UnAuthNavbarItem from './UnAuthNavbarItem';
import { Link } from 'react-router-dom';

interface Props {
    loggedInUser: User | null;
    // onLogout: () => void;
    // setShowSignInModal: () => void;
    // setShowSignUpModal: () => void;
}

const AppNavbar = ({ loggedInUser }: Props) => {
    return (
        <div className="row mb-4">
            <div className="col-md-12 d-flex align-items-center justify-content-between">
                <Link to="/" className="link-dark">
                    <GiNotebook className="fs-1" />
                </Link>
                {loggedInUser ? (
                    // <div>
                    //     <span>Logged in as: {loggedInUser.username}</span>
                    //     <button
                    //         className="btn btn-sm btn-outline-dark ms-2"
                    //         onClick={onLogout}
                    //     >
                    //         Logout
                    //     </button>
                    // </div>
                    <AuthNavbarItem username={loggedInUser.username} />
                ) : (
                    // <div>
                    //     <button
                    //         className="btn btn-sm btn-outline-dark"
                    //         onClick={setShowSignInModal}
                    //     >
                    //         Sign In
                    //     </button>
                    //     <button
                    //         className="btn btn-sm btn-outline-dark ms-2"
                    //         onClick={setShowSignUpModal}
                    //     >
                    //         Sign Up
                    //     </button>
                    // </div>
                    <UnAuthNavbarItem />
                )}
            </div>
        </div>
    );
};

export default AppNavbar;
