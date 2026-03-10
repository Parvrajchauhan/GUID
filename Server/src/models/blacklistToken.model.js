const mongoose= require('mongoose');

const BlacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    }});

const BlacklistToken = mongoose.model('BlacklistTokens', BlacklistTokenSchema);

module.exports = BlacklistToken;