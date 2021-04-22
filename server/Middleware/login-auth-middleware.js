const LoginCredentialCheck = (req, res, next) => {
    const { Username, Password } = req.body;
    if (Username.length > 3 && Password.length > 7) {
        const number_regex = /[0-9]/;
        if (number_regex.exec(Password) !== null) next();
        else return res.json({invalid_credential: true});
    }else {
        return res.json({invalid_credential: true})
    }
};

export default LoginCredentialCheck;