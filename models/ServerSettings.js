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
	anty_invite_timeout: {
		type: String,
		require: true,
		default: '',
	},
	is_management_server: {
		type: Boolean,
		require: false,
		default: false,
	},
}, { timestamps: true });

const ServerSettings = model('ServerSettings', ServerSettingsSchema);

export default ServerSettings;