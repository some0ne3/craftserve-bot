import pkg from 'mongoose';

const { Schema, model } = pkg;

const BotAdministratorsSchema = Schema({
	user_id: {
		type: String,
		require: true,
	},
}, { timestamps: true });

const BotAdministrators = model('BotAdministrators', BotAdministratorsSchema);

export default BotAdministrators;