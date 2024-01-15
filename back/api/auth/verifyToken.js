import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
		
		const expiration = decoded?.exp * 1000;
		const now = Date.now();

    if (decoded && expiration > now) return true;
  } catch (err) {
    console.error('Error verifying token:', err.message);
    return false;
  }
};



