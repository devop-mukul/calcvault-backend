const express = require('express');
const passport = require('passport');
const { googleCallback, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Google OAuth start
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/api/auth/failure' }),
  googleCallback
);

// Auth failure
router.get('/failure', (req, res) => {
  res.status(401).json({ error: 'Google authentication failed' });
});

// Current user (protected)
router.get('/me', protect, getMe);

module.exports = router;