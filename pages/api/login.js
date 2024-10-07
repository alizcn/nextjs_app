// pages/api/login.js
import dbConnect from '../../lib/mongodb';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Tüm alanları doldurun.' });
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ success: false, message: 'Kullanıcı bulunamadı.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Şifre yanlış.' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      return res.status(200).json({ success: true, token });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Sunucu hatası.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
