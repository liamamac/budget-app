const user = require("../models/Users");
const bcrpyt = require("bcrypt");

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