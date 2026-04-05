const User = require("../models/Users");
const bcrypt = require("bcrypt");

async function register(req, res) {
    try{
        const { name, email, password} = req.body;

        const existingUser = await User.findByEmail(email);
        if(existingUser) {
            return res.status(400).json({message: "Email already in use" });
        }

        const passwordHash = await bcrpyt.hash(password, 10);
        const user = new User(name, email, passwordHash);
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function login(req, res) {
    try {

        const {email, password} = req.body;
        const user = await User.findByEmail(email);
        console.log('user found:', user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
        return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { register, login };
