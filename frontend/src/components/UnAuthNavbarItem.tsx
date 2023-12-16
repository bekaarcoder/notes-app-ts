import { useState } from 'react';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import { useUserContext } from '../hooks/useUserContext';

const UnAuthNavbarItem = () => {
    const { onLogin } = useUserContext();
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);
    return (
        <>
            <div>
                <button
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => setShowSignInModal(true)}
                >
                    Sign In
                </button>
                <button
                    className="btn btn-sm btn-outline-dark ms-2"
                    onClick={() => setShowSignUpModal(true)}
                >
                    Sign Up
                </button>
            </div>

            {showSignUpModal && (
                <SignUpModal
                    onDismiss={() => setShowSignUpModal(false)}
                    onSignUpSuccessful={(user) => {
                        // setLoggedInUser(user);
                        onLogin(user);
                        setShowSignUpModal(false);
                    }}
                />
            )}

            {showSignInModal && (
                <SignInModal
                    onDismiss={() => setShowSignInModal(false)}
                    onSignInSuccessful={(user) => {
                        // setLoggedInUser(user);
                        onLogin(user);
                        setShowSignInModal(false);
                    }}
                />
            )}
        </>
    );
};

export default UnAuthNavbarItem;
