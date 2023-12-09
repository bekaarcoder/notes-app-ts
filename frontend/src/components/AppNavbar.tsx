import { User } from '../models/user';
import { GiNotebook } from 'react-icons/gi';

interface Props {
    loggedInUser: User | null;
    onLogout: () => void;
    setShowSignInModal: () => void;
    setShowSignUpModal: () => void;
}

const AppNavbar = ({
    loggedInUser,
    onLogout,
    setShowSignInModal,
    setShowSignUpModal,
}: Props) => {
    return (
        <div className="row mb-4">
            <div className="col-md-12 d-flex align-items-center justify-content-between">
                <GiNotebook className="fs-1" />
                {loggedInUser ? (
                    <div>
                        <span>Logged in as: {loggedInUser.username}</span>
                        <button
                            className="btn btn-sm btn-outline-dark ms-2"
                            onClick={onLogout}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div>
                        <button
                            className="btn btn-sm btn-outline-dark"
                            onClick={setShowSignInModal}
                        >
                            Sign In
                        </button>
                        <button
                            className="btn btn-sm btn-outline-dark ms-2"
                            onClick={setShowSignUpModal}
                        >
                            Sign Up
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppNavbar;
