import { FaRegCircleCheck } from 'react-icons/fa6';

interface Props {
    successMessage: string;
}

const AppSuccess = ({ successMessage }: Props) => {
    return (
        <p className="text-success d-flex align-items-center">
            <FaRegCircleCheck />
            <span className="ms-1">{successMessage}</span>
        </p>
    );
};

export default AppSuccess;
