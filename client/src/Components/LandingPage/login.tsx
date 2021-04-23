import React from 'react';

interface LoginProps {
    username: string;
    username_err: string | any;
    password: string;
    password_err: string | any;
    ChangeUsername: (value: string) => void;
    ChangePassword: (value: string) => void;
    Submit: () => void;
}

const Login: React.FC<LoginProps> = (props) => {
    return (
        <React.Fragment>
            
        </React.Fragment>
    )
}

export default Login;
