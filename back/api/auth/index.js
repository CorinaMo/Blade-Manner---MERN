import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../mongo/models/user/index.js';
import dotenv from 'dotenv';
import { verifyToken } from './verifyToken.js';

dotenv.config();

const authRoutes = express.Router();

const generateToken = (email) => {
	const dynamicData = { dynamicTimestamp: Date.now() };
	const token = jwt.sign({ userId: email, ...dynamicData }, process.env.JWT_SECRET, { expiresIn: '2days' });
	return token;
};

const firstVerification = async (req, res) => {
	const authCookie = req?.cookies?.authmanner;

	if (!authCookie) {
		return res.status(401).json({ error: 'Not cookie found' });
	}
	const { email } = authCookie;
	const user = await User.findOne({ email });

	if (!user) {
		return res.status(401).json({ error: 'Invalid username or password' });
	}
	res.clearCookie('authmanner');
	const newToken = generateToken(email);
	user.token = newToken;
	await user.save();
	return newToken;
};

// Sign up
authRoutes.post('/signup', async (req, res) => {
	const { username, password, email } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const verificationToken = generateToken(email);

		const user = new User({
			username,
			password: hashedPassword,
			email,
			list: [{ data: null }],
			token: verificationToken,
			created_at: Date.now(),
		});

		await user.save();
		return res.status(201).json({ message: 'User created successfully.' });
	} catch (error) {
		console.error('Error signing up:', error.message);
		res.status(500).json({ error: error.message });
	}
});

// Login
authRoutes.post('/login', async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({ error: 'Not user found' });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res.status(401).json({ error: 'Invalid password' });
		}

		const newToken = generateToken(email);
		user.token = newToken;
		await user.save();

		res.cookie('authmanner', { token: newToken, email }, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 3 * 24 * 60 * 60 * 1000 });

		res.status(200).json({ message: 'Login successful' });
	} catch (error) {
		console.error('Error logging in:', error.message);
		res.status(500).json({ error: error.message });
	}
});

// Logout
authRoutes.get('/logout', async (req, res) => {
	const newToken = await firstVerification(req, res);
	if (newToken && newToken.length > 0) {
		res.status(200).json({ message: 'Logout successful' });
	}
});

// Refresh token
authRoutes.post('/refresh', async (req, res) => {
	const newToken = await firstVerification(req, res);
	if (newToken && newToken.length > 0) {
		res.cookie('authmanner', { token: newToken, email }, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
		res.status(200).json({ message: 'Token refreshed' });
	}
});

// verify user
authRoutes.get('/verifyuser', async (req, res) => {
	const authCookie = req?.cookies?.authmanner;
	if (!authCookie) {
		return res.status(401).json({ error: 'Not cookie found' });
	}
	const { email, token } = authCookie;
	const user = await User.findOne({ email });

	if (!user) {
		return res.status(401).json({ error: 'No user found' });
	}
	const isSameToken = user?.token === token?.trim();
	const isVerifiedToken = verifyToken(token?.trim());

	if (!isSameToken || !isVerifiedToken) {
		return res.status(401).json({ error: 'Invalid Token' });
	}
	res.status(200).json({ message: 'User is verified' });
});

export default authRoutes;
