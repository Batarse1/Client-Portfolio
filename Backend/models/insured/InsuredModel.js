const { Schema, model } = require('mongoose');

var insuredSchema = Schema({
    nit: {
        type: 'String',
        require: true,
        unique: true,
        trim: true
    },
    dui: {
        type: 'String',
        unique: true,
        trim: true
    },
    name: {
        type: 'String',
        require: true,
        trim: true
    },
    phone: {
        type: 'Array',
        require: true,
        trim: true
    },
    email: {
        type: 'Array',
        require: true,
        trim: true
    },
    dob: {
        type: 'Date',
        require: true,
        trim: true
    },
    address: {
        type: 'String',
        trim: true
    },
    type: {
        type: 'String',
        require: true,
        trim: true
    },
    policyId: {
        type: 'Array',
        require: true,
        trim: true
    }
});

insuredSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();

        delete ret._id;
        delete ret.__v;
    }
});

module.exports = model('Insured', insuredSchema);