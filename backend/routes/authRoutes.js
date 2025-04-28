const express = require('express');
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const generateTokens = (payload) => {
	const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
	const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
	return { accessToken, refreshToken };
};

router.post('/signup', async (req, res) => {
	const { name, email, password } = req.body;
	try {
		let user = await User.findOne({ email });
		if (user) return res.status(400).json({ msg: 'User Already Exist' });

		user = new User({ name, email, password, refresh_Tokens: [] });
		await user.save();

		const payload = { user: { id: user.id } };
		const { accessToken, refreshToken } = generateTokens(payload);

		user.refresh_Tokens.push(refreshToken);
		await user.save();

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			path: '/api/auth',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});
		res.json({ accessToken });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		let user = await User.findOne({ email });
		if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

		const payload = { user: { id: user.id } };
		const { accessToken, refreshToken } = generateTokens(payload);

		user.refresh_Tokens.push(refreshToken);
		await user.save();

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			path: '/api/auth',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});
		res.json({ accessToken });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

router.post('/refresh', async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		if (!refreshToken) return res.status(401).json({ msg: 'No refresh token provided' });

		const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const user = await User.findById(payload.user.id);

		if (!user || !user.refresh_Tokens.includes(refreshToken)) {
			return res.status(403).json({ msg: 'Invalid refresh token' });
		}

		const newAccessToken = jwt.sign({ user: { id: user.id } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
		res.json({ accessToken: newAccessToken });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

router.post('/verify-session', async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		if (!refreshToken) return res.status(401).json({ loggedIn: false });

		const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const user = await User.findById(payload.user.id);

		if (!user || !user.refresh_Tokens.includes(refreshToken)) {
			return res.status(403).json({ loggedIn: false });
		}

		const newAccessToken = jwt.sign({ user: { id: user.id } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
		res.json({ accessToken: newAccessToken });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

router.delete('/logout', async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		if (!refreshToken) return res.sendStatus(204);

		const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const user = await User.findById(payload.user.id);

		if (user) {
			user.refresh_Tokens = user.refresh_Tokens.filter((token) => token !== refreshToken);
			await user.save();
		}

		res.clearCookie('refreshToken', {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			path: '/api/auth',
		});
		res.sendStatus(204);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
