import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NewPasswordBody } from '../api/notesApi';
import { useParams } from 'react-router-dom';
import AppError from '../components/AppError';
import AppSuccess from '../components/AppSuccess';
import TextInputField from '../components/form/TextInputField';
import * as NotesApi from '../api/notesApi';
import { BadRequestError, UnauthorizedError } from '../errors/HttpError';

const ResetPassword = () => {
    const { token } = useParams<string>();
    const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<NewPasswordBody>();

    const onSubmit = async (newPasswordBody: NewPasswordBody) => {
        try {
            const response = await NotesApi.resetPassword(
                token!,
                newPasswordBody
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
        <div className="container my-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Reset Password</h5>
                            <p className="card-text">
                                Enter a new password for your account.
                            </p>
                            {formError && <AppError errorMessage={formError} />}
                            {formSuccess && (
                                <AppSuccess successMessage={formSuccess} />
                            )}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <TextInputField
                                    type="password"
                                    name="newPassword"
                                    label="New Password"
                                    register={register}
                                    registerOptions={{
                                        required: 'Password is required',
                                    }}
                                    error={errors.newPassword}
                                />
                                <TextInputField
                                    type="password"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    register={register}
                                    registerOptions={{
                                        required:
                                            'Confirm Password is required',
                                    }}
                                    error={errors.confirmPassword}
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

export default ResetPassword;
