const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const generateToken = require("../config/generateToken");


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!(name, password, email)) {
        res.status(400);
        throw new Error("Please Enter all Credentials");
    } else {
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        } else {

            const user = await User.create({
                name,
                email,
                password,
                pic
            });

            if (user) {
                res.status(200).json({
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    pic: user.pic,
                    token: generateToken(user._id)
                });

            } else {
                res.status(400);
                throw new Error("Failed to create user");
            }
        }
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    }else{
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
})

module.exports = { registerUser,authUser };