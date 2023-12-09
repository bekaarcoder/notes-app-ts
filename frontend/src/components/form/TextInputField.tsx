/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface Props {
    name: string;
    label: string;
    register: UseFormRegister<any>;
    registerOptions?: RegisterOptions;
    error?: FieldError;
    [x: string]: any;
}

const TextInputField = ({
    name,
    label,
    register,
    registerOptions,
    error,
    ...props
}: Props) => {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input
                className={`form-control ${error ? 'is-invalid' : ''}`}
                {...register(name, registerOptions)}
                {...props}
            />
            <div className="invalid-feedback">{error?.message}</div>
        </div>
    );
};

export default TextInputField;
