const jwt = require('jsonwebtoken');

// JWT token generate karo
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// Google OAuth callback ke baad yahan aayega
const googleCallback = (req, res) => {
  try {
    const token = generateToken(req.user._id);

    // Frontend pe redirect karo token ke saath
    res.redirect(
      `${process.env.CLIENT_URL}/auth/success?token=${token}&name=${encodeURIComponent(req.user.name)}&avatar=${encodeURIComponent(req.user.avatar)}`
    );
  } catch (error) {
    res.redirect(`${process.env.CLIENT_URL}/auth/error`);
  }
};

// Current user info
const getMe = (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.avatar
  });
};

module.exports = { googleCallback, generateToken, getMe };