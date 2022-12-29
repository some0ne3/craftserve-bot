import pkg from 'mongoose';

const { Schema, model } = pkg;

const ServerSettingsSchema = Schema({
	server_id: {
		type: String,
		require: true,
	},
	anty_invite_enabled: {
		type: Boolean,
		require: true,
		default: false,
	},
	anty_phishing_enabled: {
		type: Boolean,
		require: true,
		default: false,
	},
}, { timestamps: true });

const WhitelistedServers = model('ServerSettings', ServerSettingsSchema);

export default WhitelistedServers;