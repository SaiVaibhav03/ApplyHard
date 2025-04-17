require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(
	cors({
		origin: 'http://127.0.0.1:5173/',
		// methods: ['GET', 'POST', 'PATCH', 'DELETE'],
		// credentials: true,
	})
);
app.use(express.json());

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('Mongoose Connection Successful'))
	.catch(() => console.log('Mongoose Connection Failed'));

const authRoutes = require('./routes/authRoutes.js');
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
	console.log('3000 port started listening');
});
