const express = require('express');
const router = express.Router();
const User = require('../models/User');

//
// REGISTER
//
router.post('/register', async (req, res) => {
    try {
        const { email, password, fullName, phone, address } = req.body;

        const existUser = await User.findOne({ email });
        if (existUser)
            return res.status(400).json({ message: 'Email đã tồn tại!' });

        const user = new User({
            email,
            password,
            fullName,
            phone,
            address
        });

        await user.save();
        res.status(201).json(user);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//
// LOGIN
//
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });
        if (!user)
            return res.status(401).json({ message: 'Sai email hoặc mật khẩu' });

        if (!user.status)
            return res.status(403).json({ message: 'Tài khoản bị khóa' });

        res.json(user);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/change-password/:id', async (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    if (user.password !== currentPassword) {
        return res.status(400).json({ message: 'Mật khẩu hiện tại không đúng' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Đổi mật khẩu thành công' });
});
module.exports = router;
