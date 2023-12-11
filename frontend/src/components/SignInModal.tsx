import { useForm } from 'react-hook-form';
import { User } from '../models/user';
import { SignInCredentials } from '../api/notesApi';
import * as NotesApi from '../api/notesApi';
import AppModal from './AppModal';
import TextInputField from './form/TextInputField';
import { useState } from 'react';
import AppError from './AppError';
import { BadRequestError, UnauthorizedError } from '../errors/HttpError';
import { Link } from 'react-router-dom';

interface Props {
    onDismiss: () => void;
    onSignInSuccessful: (user: User) => void;
}

const SignInModal = ({ onDismiss, onSignInSuccessful }: Props) => {
    const [formError, setFormError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInCredentials>();

    const onSubmit = async (credentials: SignInCredentials) => {
        try {
            const user = await NotesApi.signIn(credentials);
            onSignInSuccessful(user);
            setFormError(null);
        } catch (error) {
            if (
                error instanceof BadRequestError ||
                error instanceof UnauthorizedError
            ) {
                setFormError(error.message);
            } else {
                console.error(error);
                setFormError('Something went wrong');
            }
        }
    };
    return (
        <AppModal title="Sign In" onDismiss={onDismiss}>
            {formError && <AppError errorMessage={formError} />}
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                    type="text"
                    name="username"
                    label="Username"
                    register={register}
                    registerOptions={{ required: 'Username is required' }}
                    error={errors.username}
                />
                <TextInputField
                    name="password"
                    label="Password"
                    type="password"
                    register={register}
                    registerOptions={{ required: 'Password is required' }}
                    error={errors.password}
                />
                <div className="d-grid">
                    <button
                        className="btn btn-dark"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm"
                                    aria-hidden="true"
                                ></span>
                                <span className="visually-hidden" role="status">
                                    Loading...
                                </span>
                            </>
                        ) : (
                            <span>Sign In</span>
                        )}
                    </button>
                </div>
                <div className="text-center my-2">
                    <Link to="/forget-password">Forgot your password?</Link>
                </div>
            </form>
        </AppModal>
    );
};

export default SignInModal;
