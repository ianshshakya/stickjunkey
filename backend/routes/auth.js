const express = require('express');
const passport = require('passport');

const authController = require('../controllers/authController');
const router = express.Router();

// Manual auth
router.post('/register', authController.register);
router.post('/login', passport.authenticate('local'), authController.login);
router.get('/logout', authController.logout);

// Google OAuth
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login-failed' }),
    (req, res) => {
      res.redirect('http://localhost:3000/dashboard'); // or your frontend/dashboard route
    }
  );
module.exports = router;


