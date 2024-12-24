import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import owasp from "owasp-password-strength-test";


dotenv.config();

// you can format the response
export const fMsg = (res, msg, result = {}, statusCode = 200) => {
    return res.status(statusCode).json({ con: true, msg, result });
};

export const fError = (res, msg, statusCode = 500) => {
    return res.status(statusCode).json({ con: false, msg});
};

//you can encode the password
export const encode = (payload) => {
    return bcrypt.hashSync(payload, 10);
};

//you can decode the password
export const decode = (payload, hash) => {
    return bcrypt.compareSync(payload, hash);
};

export const passwordStrength = (password) => {
    if(owasp.test(password).errors.length > 0){
        return false;
    }
    return true;
};

//for frontend without sending cookie
//you can generate JWT the token
export const genToken = (payload) =>
    jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
            data: payload,
        },
        process.env.JWT_SECRET
    );

// for web user interface   
// This function generates a JSON Web Token (JWT) for a given user_id and sets it as a cookie in the response.
export const generateTokenAndSetCookie = (res, user_id) => {
    // Sign a JWT with the user_id and a secret key, set to expire in 30 days.
    const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    // Set the JWT as a cookie in the response, with security features to prevent XSS and ensure it's sent over HTTPS in development.
    res.cookie('jwt', token, {
        httpOnly: true, // prevent XSS
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
        secure: process.env.NODE_ENV === 'development',
    });

    return token;
};