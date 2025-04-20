const express = require('express');
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/signup', async (req, res) => {
	const { name, email, password } = req.body;
	try {
		let user = await User.findOne({ email });
		if (user) return res.status(400).json({ msg: 'User Already Exist' });

		user = new User({ name, email, password });
		await user.save();

		const payload = { user: { id: user.id } };
		jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }, (err, accessToken) => {
			if (err) throw err;
			res.json({ accessToken });
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		let user = await User.findOne({ email });
		if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

		const payload = { user: { id: user.id } };
		jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15min' }, (err, accessToken) => {
			if (err) throw err;
			res.json({ accessToken });
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
