import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';


export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        if( !fullName || !email || !password ) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if( password.length < 6 ) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        if(User.findOne({ email})) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if(newUser) {
            genrateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

export const login = async (req, res) => {}

export const logout = async (req, res) => {}

export const profileUpdate = async (req, res) => {}