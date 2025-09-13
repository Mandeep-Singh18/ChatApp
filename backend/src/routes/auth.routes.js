import express from 'express';

const router = express.Router();

router.post('/signup', ( req, res) => {
    res.send('User signup');
});
router.post('/login', ( req, res) => {
    res.send('User login');
});
router.post('/logout', ( req, res) => {
    res.send('User logout');
});
router.put('/profile-update', ( req, res) => {
    res.send('User profile update');
});

export default router;