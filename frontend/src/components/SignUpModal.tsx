import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as NotesApi from '../api/notesApi';
import { SignUpCredentials } from '../api/notesApi';
import { User } from '../models/user';
import AppError from './AppError';
import AppModal from './AppModal';
import TextInputField from './form/TextInputField';
import { BadRequestError, UnauthorizedError } from '../errors/HttpError';

interface Props {
    onDismiss: () => void;
    onSignUpSuccessful: (user: User) => void;
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: Props) => {
    const [formError, setFormError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpCredentials>();

    const onSubmit = async (credentials: SignUpCredentials) => {
        try {
            const newUser = await NotesApi.signUp(credentials);
            onSignUpSuccessful(newUser);
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
        <AppModal title="Sign Up" onDismiss={onDismiss}>
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
                    name="email"
                    label="Email"
                    type="email"
                    register={register}
                    registerOptions={{ required: 'Email is required' }}
                    error={errors.email}
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
                            <span>Sign Up</span>
                        )}
                    </button>
                </div>
            </form>
        </AppModal>
    );
};

export default SignUpModal;
