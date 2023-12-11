import { useEffect, useState } from 'react';
import './App.css';
import * as NotesApi from './api/notesApi';
import AppNavbar from './components/AppNavbar';
import Notes from './components/Notes';
import SignInModal from './components/SignInModal';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';

function App() {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);

    const onLogout = async () => {
        try {
            await NotesApi.logout();
            setLoggedInUser(null);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const user = await NotesApi.getLoggedInUser();
                setLoggedInUser(user);
            } catch (error) {
                console.error(error);
                setLoggedInUser(null);
            }
        };
        fetchLoggedInUser();
    }, []);

    return (
        <div className="container my-4">
            <AppNavbar
                loggedInUser={loggedInUser}
                onLogout={onLogout}
                setShowSignInModal={() => setShowSignInModal(true)}
                setShowSignUpModal={() => setShowSignUpModal(true)}
            />
            {loggedInUser ? (
                <Notes />
            ) : (
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center display-4">Notes App</h2>
                        <p className="text-center">
                            Please login to view your notes.
                        </p>
                    </div>
                </div>
            )}

            {showSignUpModal && (
                <SignUpModal
                    onDismiss={() => setShowSignUpModal(false)}
                    onSignUpSuccessful={(user) => {
                        setLoggedInUser(user);
                        setShowSignUpModal(false);
                    }}
                />
            )}

            {showSignInModal && (
                <SignInModal
                    onDismiss={() => setShowSignInModal(false)}
                    onSignInSuccessful={(user) => {
                        setLoggedInUser(user);
                        setShowSignInModal(false);
                    }}
                />
            )}
        </div>
    );
}

export default App;
