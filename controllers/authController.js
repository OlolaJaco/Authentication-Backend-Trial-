import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// configuring DotEnv
dotenv.config();


//* Code for register


const register = async (req, res) => {
    //getting the inputs from their name attributes in the body
    const { name, email, password } = req.body;

    try {
        // check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({msg: "User already exists"});
        }
        // create a new user instance
        user = new User({ name, email, password});

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save the user to the database
        await user.save();

        // Generate JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
            if (err) throw err;
            res.json({ token });
        } );
    }   catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// * Code for Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // check if the user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({msg: 'invalid credentials'});
        }

        // Generate JWT token
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

export default { register, login };