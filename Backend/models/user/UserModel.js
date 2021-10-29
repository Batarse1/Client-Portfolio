const { Schema, model } = require('mongoose');

var userSchema = Schema({
    username: {
        type: 'String',
        require: true,
        unique: true,
        trim: true
    },
    hash: {
        type: 'String',
        required: true,
        trim: true
    }
});

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        
        delete ret._id;
        delete ret.__v;
        delete ret.hash;
    }
});

module.exports = model('User', userSchema);