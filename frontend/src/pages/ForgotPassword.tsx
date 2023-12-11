import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PasswordResetRequestBody } from '../api/notesApi';
import TextInputField from '../components/form/TextInputField';
import * as NotesApi from '../api/notesApi';
import { BadRequestError, UnauthorizedError } from '../errors/HttpError';
import AppError from '../components/AppError';
import AppSuccess from '../components/AppSuccess';

const ForgotPassword = () => {
    const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PasswordResetRequestBody>();

    const onSubmit = async (emailOrUsername: PasswordResetRequestBody) => {
        try {
            const response = await NotesApi.requestResetPassword(
                emailOrUsername
            );
            setFormSuccess(response.success);
            setFormError(null);
            reset();
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
            setFormSuccess(null);
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Forget Password</h5>
                            <p className="card-text">
                                Enter the email id or username of your
                                associated account, then click continue.
                            </p>
                            {formError && <AppError errorMessage={formError} />}
                            {formSuccess && (
                                <AppSuccess successMessage={formSuccess} />
                            )}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <TextInputField
                                    type="text"
                                    name="emailOrUsername"
                                    label="Email / Username"
                                    register={register}
                                    registerOptions={{
                                        required: 'Username is required',
                                    }}
                                    error={errors.emailOrUsername}
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
                                                <span
                                                    className="visually-hidden"
                                                    role="status"
                                                >
                                                    Loading...
                                                </span>
                                            </>
                                        ) : (
                                            <span>Continue</span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
