import {Schema, model} from 'mongoose';

const MuteSchema = Schema({
    user: {
        type: Number,
        require: true
    },
    admin: {
        type: Number,
        require: false
    },
    reason: {
        type: String,
        require: false
    },
    endAt: {
        type: Number,
        require: true
    },
    muteHelp: {
        type: Boolean,
        require: false,
        default: false
    }
}, {timestamps: true})

const Mutes = model('Mutes', MuteSchema);

export default Mutes;