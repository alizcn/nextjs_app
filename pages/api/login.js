import dbConnect from '../../lib/mongodb';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const sendResponse = (res, statusCode, success, message, token = null) => {
  return res.status(statusCode).json({ success, message, token });
};

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendResponse(res, 400, false, 'Tüm alanları doldurun.'); // All fields must be filled.
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return sendResponse(res, 400, false, 'Kullanıcı bulunamadı.'); // User not found.
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return sendResponse(res, 400, false, 'Şifre yanlış.'); // Incorrect password.
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      return sendResponse(res, 200, true, 'Başarıyla giriş yapıldı.', token); // Successfully logged in.
    } catch (error) {
      console.error(error); // Log the error for debugging
      return sendResponse(res, 500, false, 'Sunucu hatası.'); // Server error.
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${method} Not Allowed`); // Method not allowed.
  }
}
