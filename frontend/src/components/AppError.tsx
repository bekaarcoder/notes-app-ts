import { FaCircleExclamation } from 'react-icons/fa6';

interface Props {
    errorMessage: string;
}

const AppError = ({ errorMessage }: Props) => {
    return (
        <p className="text-danger d-flex align-items-center">
            <FaCircleExclamation />
            <span className="ms-1">{errorMessage}</span>
        </p>
    );
};

export default AppError;
