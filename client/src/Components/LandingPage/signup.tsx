import React from 'react';

interface SignupProps {
    username: string;
    password: string;
    confirm: string;
    phone: string;
    username_err: any;
    password_err: any;
    confirm_err: any;
    phone_err: any;
    ChangeUsername: (value: string) => void;
    ChangePassword: (value: string) => void;
    ChangeConfirm: (value: string) => void;
    ChangePhone: (value: string) => void;
    Submit: () => void
};

const Signup: React.FC<SignupProps> = (props) => {
    return (
        <React.Fragment>
            
        </React.Fragment>
    )
}

export default Signup;
