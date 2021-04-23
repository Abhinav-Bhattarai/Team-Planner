import React from 'react';
import './signup.scss';

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
            <div className='signup-container'>
              <h1>Signup</h1>
            </div>
        </React.Fragment>
    )
}

export default Signup;
