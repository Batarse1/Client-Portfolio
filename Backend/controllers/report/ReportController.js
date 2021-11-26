const User = require('../../models/user/UserModel');
const Policy = require('../../models/policy/PolicyModel');
const Customer = require('../../models/customer/CustomerModel');

const ReportController ={
    getMonthlyPayment: async (req, res) => {
        try {
            let monthlyPayment;
            const allCustomersArray = [];
            
            const user = await User.findOne({ _id: req.user._id });

            if (!user) {
                throw {
                    error: true,
                    message: 'user not found'
                };
            }

            const allCustomers = await Customer.find({ userId: user._id });

            allCustomers.forEach(customer => {
                allCustomersArray.push(customer.id)
            });

            
            const allPolicies = await Policy.find({ customerId: allCustomersArray });

            allPolicies.forEach(policy => {
                monthlyPayment = policy.commission/100 * policy.plannedPremium
            });

           return res.status(200).json({
                error: false,
                monthlyPayment
            });
        }
        catch (error) {
            return res.status(404).json({
                error: error.message ?? error,
                message: 'not found'
            });
        }
    },
};

module.exports = ReportController;