import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
    try {
        const loginuserId = req.user._id;
        const users = await User.find({ _id: { $ne: loginuserId } }).select('-password -email');
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id:receiverId } = req.params;
        const loginuserId = req.user._id;

        const messages = await Message.find({
            $or: [
                { sender: loginuserId, reciever: receiverId },
                { sender: receiverId, reciever: loginuserId }
            ]
        });

        res.status(200).json(messages);

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, media } = req.body;
        const { id:receiverId } = req.params;
        const loginuserId = req.user._id;

        if(!text && !media) {
            return res.status(400).json({ error: 'Message is required' });
        }

        let imageurl;
        if(media) {
            const uploadResponse = await cloudinary.uploader.upload(media);
            imageurl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            sender: loginuserId,
            reciever: receiverId,
            text,
            media: imageurl
        });

        await newMessage.save();
        res.status(201).json(newMessage);

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}