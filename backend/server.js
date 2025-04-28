require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:5173',
		methods: ['GET', 'POST', 'PATCH', 'DELETE'],
		credentials: true,
	})
);
app.use(cookieParser());

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('Mongoose Connection Successful'))
	.catch(() => console.log('Mongoose Connection Failed'));

const authRoutes = require('./routes/authRoutes.js');
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
	console.log('3000 port started listening');
});
