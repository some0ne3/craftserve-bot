import Mongoose from 'mongoose';

export default () => {
	Mongoose.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	});

	Mongoose.connection.on('error', console.error.bind(console, 'Connection error:'));
	Mongoose.connection.once('open', () => {
		console.log('Connected to Database.');
	});
	return Mongoose.connection;
};