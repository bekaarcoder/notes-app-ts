import * as NotesApi from '../api/notesApi';
import { useUserContext } from '../hooks/useUserContext';

interface Props {
    username: string;
}

const AuthNavbarItem = ({ username }: Props) => {
    const { onLogout } = useUserContext();

    const logout = async () => {
        try {
            await NotesApi.logout();
            onLogout();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <span>Logged in as: {username}</span>
            <button
                className="btn btn-sm btn-outline-dark ms-2"
                onClick={logout}
            >
                Logout
            </button>
        </div>
    );
};

export default AuthNavbarItem;
