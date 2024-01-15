import express from 'express';
import User from '../../mongo/models/user/index.js';
import ItemList from '../../mongo/models/itemlist/index.js';
import dotenv from 'dotenv';
import { verifyToken } from '../auth/verifyToken.js';
dotenv.config();

const userListRoutes = express.Router();

// PUT item
userListRoutes.put('/', async (req, res) => {
	const { item } = req.body;
	const authCookie = req?.cookies?.authmanner;
	// console.log('item, ', item);
	if (!authCookie) {
		return res.status(401).json({ error: 'Authentication cookie not found' });
	}
	const { token, email } = authCookie;

	if (!email) {
		return res.status(404).json({ error: 'Email is required' });
	}
	if (!item || !item?.api_id) {
		return res.status(404).json({ error: 'Item is required' });
	}

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		const listApiIds = user?.list?.map(el => {
			return `${el?.api_id}`;
		}) ?? [];
	
		if (listApiIds?.includes(listApiIds[0]?.api_id)) {
			return res.status(404).json({ error: 'Item already exists' });
		}
		const isSameToken = user?.token === token?.trim();
		const isVerifiedToken = verifyToken(token);

		// Check if token is valid
		if (isSameToken, isVerifiedToken) {
			const newItem = new ItemList({
				api: item?.api ?? 'none',
				api_id: item?.api_id ?? 'none',
				extra_info: item?.extra_info ?? { data: null },
				image: item?.image ?? 'none',
				title: item?.title ?? 'none',
				type: item?.type ?? 'none',
				overview: item?.overview ?? 'none',
			})

			// Add new item to the list
			if (user?.list?.length === 1 && user?.list[0]?.data === null) {
				const updatedList = [newItem];
				await user.updateOne({ $set: { list: updatedList } });
			} else {
				const updatedList = [...user?.list, newItem] ?? [newItem];
				await user.updateOne({ $set: { list: updatedList } });
			}

			res.status(200).json({ message: 'Item added successfully' });
		} else {
			res.status(401).json({ error: 'Invalid Token' });
		}
	} catch (error) {
		console.error('Error adding item:', error.message);
		res.status(500).json({ error: error.message });
	}
});

// GET items
userListRoutes.get('/', async (req, res) => {
	const authCookie = req?.cookies?.authmanner;
	if (!authCookie) {
		return res.status(401).json({ error: 'Authentication cookie not found' });
	}
	const { token, email } = authCookie;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		const isSameToken = user?.token === token?.trim();
		const isVerifiedToken = await verifyToken(token);

		// Check if token is valid
		if (isSameToken, isVerifiedToken) {
			return res.status(200).json(user.list);
		} else {
			return res.status(401).json({ error: 'Invalid Token' });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

// DELETE item
userListRoutes.delete('/', async (req, res) => {
	const { api_id } = req.body;
	const authCookie = req?.cookies?.authmanner;

	if (!authCookie) {
		return res.status(401).json({ error: 'Authentication cookie not found' });
	}
	const { token, email } = authCookie;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
	
		const isSameToken = user?.token === token?.trim();
		const isVerifiedToken = await verifyToken(token);

		// Check if token is valid
		if (isSameToken, isVerifiedToken) {
			const updatedList = user.list.filter(item => item.api_id !== String(api_id));

			await user.updateOne({ $set: { list: updatedList } });
			return res.status(200).json({ message: 'Item deleted successfully' });
		} else {
			return res.status(401).json({ error: 'Invalid Token' });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

export default userListRoutes;
