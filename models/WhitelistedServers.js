import pkg from 'mongoose';

const { Schema, model } = pkg;

const WhitelistedServersSchema = Schema({
	whitelisted_server_id: {
		type: String,
		require: false,
	},
	parent_server_id: {
		type: String,
		require: false,
	},
}, { timestamps: true });

const WhitelistedServers = model('WhitelistedServers', WhitelistedServersSchema);

export default WhitelistedServers;