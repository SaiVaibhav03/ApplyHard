const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema({
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

const User = mongoose.model('User', UserSchema);
module.exports = User;
