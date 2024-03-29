import pkg from 'mongoose';

const { Schema, model } = pkg;

const WhitelistedServersSchema = Schema({
	whitelisted_server_id: {
		type: String,
		require: true,
	},
	parent_server_id: {
		type: String,
		require: true,
	},
}, { timestamps: true });

WhitelistedServersSchema.index({ whitelisted_server_id: 1, parent_server_id: 1 }, { unique: true });

const WhitelistedServers = model('WhitelistedServers', WhitelistedServersSchema);

export default WhitelistedServers;