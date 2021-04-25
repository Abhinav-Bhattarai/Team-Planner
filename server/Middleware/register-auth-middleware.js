import RegistrationModel from "../Model/RegistrationModel.js";

const RegisterValidationCheck = async(req, res, next) => {
    const { Username, Password, Confirm, Phone } = req.body;
    if (Username.length > 3 &&  Password === Confirm && Phone.length > 9) {
        const number_regex = /[0-9]/;
        if (number_regex.exec(Password) !== null ) {
            const response = await RegistrationModel.findOne({Username});
            if (response === null) next();
            else return res.json({invalid_credentials: true});
        }
        else return res.json({invalid_credentials: true});
    }else {
        return res.json({invalid_credentials: true});
    }
};

export default RegisterValidationCheck;