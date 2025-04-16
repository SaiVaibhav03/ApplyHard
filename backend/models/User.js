const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
		unique: true,
	},
	password: {
		type: String,
		require: true,
	},
});

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
