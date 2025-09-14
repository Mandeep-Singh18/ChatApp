import jsonwebtoken from 'jsonwebtoken';

export const generateToken(userId, res) => {
    const token = jsonwebtoken.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
}