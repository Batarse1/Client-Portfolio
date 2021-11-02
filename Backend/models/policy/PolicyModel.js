const { Schema, model } = require('mongoose');

var policiesSchema = Schema({
    customerId: {
        type: 'String',
        require: true,
        trim: true
    },
    number: {
        type: 'String',
        require: true,
        unique: true,
        trim: true
    },
    product: {
        type: 'String',
        require: true,
        trim: true
    },
    plan: {
        type: 'String',
        require: true,
        trim: true
    },
    commission: {
        type: 'Number',
        require: true,
        trim: true
    },
    insuranceCarrier: {
        type: 'String',
        require: true,
        trim: true
    },
    paymentFrequency: {
        type: 'string',
        require: true,
        trim: true
    },
    totalPremium: {
        type: 'Number',
        require: true,
        trim: true
    },
    basicPremium: {
        type: 'Number',
        trim: true
    },
    plannedPremium: {
        type: 'Number',
        require: true,
        trim: true
    },
    initialValidity: {
        type: 'Date',
        require: true,
        trim: true
    },
    finalValidity: {
        type: 'Date',
        require: true,
        trim: true
    }
});

policiesSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = model('Policies', policiesSchema);