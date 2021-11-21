const Customer = require('../../models/customer/CustomerModel');
const User = require('../../models/user/UserModel');

const { getCustomerValidator, addCustomerValidator, updateCustomerValidator, deleteCustomerValidator, getAllCustomersOfInsuranceCarrierValidator } = require('./Validator');

var CustomerController = {
    getCustomer: async (req, res) => {
        try {
            const customerId = req.header('id');
            await getCustomerValidator(customerId);

            const currentCustomer = await Customer.findOne({
                $and: [
                    { _id: customerId },
                    { userId: req.user._id }
                ]
            });

            if (!currentCustomer) {
                throw {
                    error: true,
                    message: 'customer not found'
                };
            }

            return res.status(200).json({
                error: false,
                currentCustomer
            });
        }
        catch (error) {
            return res.status(404).json({
                error: error.message ?? error,
                message: 'not found'
            });
        }
    },
    getAllCustomersOfUser: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.user._id });

            if (!user) {
                throw {
                    error: true,
                    message: 'user not found'
                };
            }

            const { page = 1, limit = 10 } = req.query;

            const allCustomers = await Customer.find({ userId: user._id })
                .limit()
                .skip((page - 1) * limit)
                .exec();

            const count = await Customer.countDocuments({ userId: user._id });

            return res.status(200).json({
                error: false,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                allCustomers
            });
        }
        catch (error) {
            return res.status(404).json({
                error: error.message ?? error,
                message: 'not found'
            });
        }
    },
    getAllCustomersOfInsuranceCarrier: async (req, res) => {
        try {
            const insuranceCarrier = req.header('insuranceCarrier');
            await getAllCustomersOfInsuranceCarrierValidator(insuranceCarrier);

            const user = await User.findOne({ _id: req.user._id });

            if (!user) {
                throw {
                    error: true,
                    message: 'user not found'
                };
            }

            const { page = 1, limit = 10 } = req.query;

            const allCustomers = await Customer.find({
                $and: [
                    { userId: user._id },
                    { insuranceCarrier: [insuranceCarrier] }
                ]
            })
                .limit()
                .skip((page - 1) * limit)
                .exec();

            const count = await Customer.countDocuments({
                $and: [
                    { userId: user._id },
                    { insuranceCarrier: [insuranceCarrier] }
                ]
            });

            return res.status(200).json({
                error: false,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                allCustomers
            });
        }
        catch (error) {
            return res.status(404).json({
                error: error.message ?? error,
                message: 'not found'
            });
        }
    },
    addCustomer: async (req, res) => {
        try {
            console.log(req.body);
            await addCustomerValidator(req.body);

            const currentUser = await User.findOne({ _id: req.user._id });

            if (!currentUser) {
                throw {
                    error: true,
                    message: 'user not found'
                };
            }

            const newCustomer = new Customer({
                nit: req.body.nit,
                dui: req.body.dui,
                name: req.body.name,
                dob: req.body.dob,
                phone: req.body.phone,
                email: req.body.email,
                insuranceCarrier: req.body.insuranceCarrier,
                address: req.body.address,
                type: req.body.type,
                userId: currentUser.id
            });

            await newCustomer.save();

            return res.status(201).json({
                error: 'false',
                message: 'added'
            });
        }
        catch (error) {
            return res.status(400).json({
                error: error.message ?? error,
                message: 'not added'
            });
        }
    },
    updateCustomer: async (req, res) => {
        try {
            await updateCustomerValidator(req.body);

            let currentCustomer = await Customer.findOne({
                $and: [
                    { _id: req.body.id },
                    { userId: req.user._id }
                ]
            });

            if (!currentCustomer) {
                throw {
                    error: true,
                    message: 'customer not found'
                };
            }

            currentCustomer = {
                name: req.body.name || currentCustomer.name,
                dob: req.body.dob || currentCustomer.dob,
                phone: req.body.phone || currentCustomer.phone,
                email: req.body.email || currentCustomer.email,
                insuranceCarrier: req.body.insuranceCarrier || currentCustomer.insuranceCarrier,
                address: req.body.address || currentCustomer.address,
                type: req.body.type || currentCustomer.type,
                userId: currentCustomer.userId
            };

            if (req.body.nit) {
                currentCustomer = {
                    nit: req.body.nit
                };
            }

            if (req.body.dui) {
                currentCustomer = {
                    nit: req.body.dui
                };
            }

            await Customer.findOneAndUpdate({ _id: req.body.id }, currentCustomer);

            return res.status(200).json({
                error: false,
                message: 'updated'
            });
        }
        catch (error) {
            return res.status(400).json({
                error: error.message ?? error,
                message: 'not updated'
            });
        }
    },
    deleteCustomer: async (req, res) => {
        try {
            await deleteCustomerValidator(req.body);

            const currentCustomer = await Customer.findOne({
                $and: [
                    { _id: req.body.id },
                    { userId: req.user._id }
                ]
            });
            
            if (!currentCustomer) {
                throw {
                    error: true,
                    message: 'customer not found'
                };
            }

            await Customer.findOneAndDelete({ _id: req.body.id }, currentCustomer);

            return res.status(200).json({
                error: false,
                message: 'deleted'
            });
        }
        catch (error) {
            return res.status(404).json({
                error: error.message ?? error,
                message: 'not deleted'
            });
        }
    }
};

module.exports = CustomerController;