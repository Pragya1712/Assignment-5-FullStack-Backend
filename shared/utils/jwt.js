import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET

const createToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: process.env.Token_EXPIRY || 3600000 });
}

const verifyToken = (token) => {
    return jwt.verify(token, secretKey);
}

export { createToken, verifyToken };