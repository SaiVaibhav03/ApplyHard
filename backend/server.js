const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose
	.connect('mongodb://localhost:27017/applyhard')
	.then(() => console.log('Mongoose Connection Successful'))
	.catch(() => console.log('Mongoose Connection Failed'));

app.use('/', (req, res) => {
	console.log(req.query);
	if (req.query.closeMongo == 'true') {
		mongoose
			.disconnect()
			.then(() => console.log(`MongoDB Connection Closed`))
			.catch(() => console.log(`MongoDB Connection Closed Failed`));
	}
	res.send(`
			<div>
				<button onclick="fetch('/?closeMongo=true')">
					Close Mongo
				</button>
			</div>
		`);
});

app.listen(3000, () => {
	console.log('3000 port started listening');
});
