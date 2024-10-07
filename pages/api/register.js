import dbConnect from '../../lib/mongodb';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

const sendResponse = (res, statusCode, success, message, data = null) => {
  return res.status(statusCode).json({ success, message, data });
};

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === 'POST') {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return sendResponse(res, 400, false, 'Tüm alanları doldurun.'); // All fields must be filled.
    }

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return sendResponse(res, 400, false, 'Email zaten kullanımda.'); // Email already in use.
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      return sendResponse(res, 201, true, 'Kullanıcı başarıyla oluşturuldu.', user); // User successfully created.
    } catch (error) {
      console.error(error); // Log the error for debugging
      return sendResponse(res, 500, false, 'Sunucu hatası.'); // Server error.
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${method} Not Allowed`); // Method not allowed.
  }
}
