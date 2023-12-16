import './App.css';
import Notes from './components/Notes';
import { useUserContext } from './hooks/useUserContext';

function App() {
    const { loggedInUser, loading } = useUserContext();

    if (loading) return <></>;

    return (
        <>
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
        </>
    );
}

export default App;
