const User= require('../models/user.model');
const BlacklistToken = require('../models/blacklistToken.model');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser= async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const isUserExists = await User.findOne({ $or: [{ username }, { email }] });
    if(isUserExists) {
    if (isUserExists.username === username) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    if (isUserExists.email === email) {
        return res.status(400).json({ message: 'Email already exists' });
    }}

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    });

    const token = jwt.sign({ id: newUser._id , username: newUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie("token", token);

    res.status(201).json({ message: 'User registered successfully',user:{
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
    }});

};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie("token", token);

    res.status(200).json({ message: 'Login successful', user: { id: user._id, username: user.username, email: user.email } });
};

const logout = async (req,res) => {
    const token=req.cookies.token

    if(token){
        await BlacklistToken.create({token})
    }

    res.clearCookie("token");

    res.status(200).json({
        message:"user logout succesfully"
    })

}

const getProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ "message": "User profile fetched successfully", "user": user });
};

module.exports = { registerUser, loginUser, logout, getProfile };