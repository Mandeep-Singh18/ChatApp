import jwt from "jsonwebtoken";


export const protectRoute = async (req, res, next) => {
    try{        
        const token = req.cookies.jwt;

        if(!token) {
            return res.status(401).json({ message: 'Not authorized'});
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if(!verified) {
            return res.status(401).json({ message: 'Not authorized'});
        }

        const user = await User.findOne( { _id: verified.id } ).select('-password');
        if(!user) {
            return res.status(401).json({ message: 'Not authorized'});
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(500).json({ message: 'Server Error'});   
    }
}

