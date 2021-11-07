const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../../models/user/UserModel');

const { signUpValidator, loginValidator } = require('./Validator');

var UserController = {
    signUp: async (req, res) => {
        try {
            await signUpValidator(req.body);

            const notUnique = await User.find({
                username: req.body.username
            });

            if (notUnique.length != 0) {
                throw 'username already registered';
            }

            if (req.body.password !== req.body.confirmPassword){
                throw "passwords don't match";
            }

            let hashedPassword = await bcrypt.hash(req.body.password, parseInt(process.env.SALT));

            const newUser = new User({
                username: req.body.username,
                hash: hashedPassword
            });

            await newUser.save();

            return res.status(201).json({
                error: 'false',
                message: 'created'
            });
        }
        catch (error) {
            return res.status(400).json({
                error: error.message ?? error,
                message: 'not created'
            });
        }
    },
    login: async (req, res) => {
        try {
            await loginValidator(req.body);

            const user = await User.findOne({ username: req.body.username });

            if (!user) {
                throw {
                    error: true,
                    message: 'user not found'
                };
            }

            var logged = await bcrypt.compare(req.body.password, user.hash);

            if (!logged) {
                throw {
                    error: true,
                    message: 'wrong password'
                };
            }

            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY);

            return res.status(200).json({
                error: false,
                token: token
            });
        }
        catch (error) {
            return res.status(400).json({
                error: error.message ?? error,
                message: 'not created'
            });
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.user._id });

            return res.status(200).json({
                error: false,
                user
            });
        }
        catch (error) {
            return res.status(404).json({
                error: error.details != null ? error.details[0].message : error,
                message: 'not found'
            });
        }
    }
};

module.exports = UserController;