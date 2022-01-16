import pkg from 'mongoose';

const { Schema, model } = pkg;

const CustomCommandsSchema = Schema({
	command_name: {
		type: String,
		require: true,
	},
	command_description: {
		type: String,
		require: true,
	},
	command_id: {
		type: String,
		require: true,
	},
	parent_server_id: {
		type: String,
		require: true,
	},
	command_content: {
		type: String,
		require: false,
	},
	copy_user_input: {
		type: Boolean,
		require: false,
	},
	embed_json: {
		type: String,
		require: false,
	},
}, { timestamps: true });

CustomCommandsSchema.index({ command_name: 1, parent_server_id: 1 }, { unique: true });

const CustomCommands = model('CustomCommands', CustomCommandsSchema);

export default CustomCommands;