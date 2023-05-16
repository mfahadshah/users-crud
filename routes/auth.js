const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
// const auth = require('../middlewares/auth');
const { ValidationErrors } = require("../helpers/ValidationErrors");
const { check, oneOf, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
],
  async (req, res) => {
    const errorsList = validationResult(req);
    if (!errorsList.isEmpty())
      return res.status(400).json(ValidationErrors(errorsList));
    
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email , role: "admin"}); //check if user exists
      if (!user) 
        return res.status(200).json({ message: 'Invalid Email Account', ack: false });

      const isMatch = await bcrypt.compare(password, user.password); 
      
      if (!isMatch) {
        return res.status(200).json({ message: 'Invalid Password', ack: false});
      }
      const { name, phoneNo, role } = user;
      const userDetails = {
        name, email, phoneNo, role, loginTimeUTC: new Date().toUTCString()
      }

      const payload = {
        user_id: user.id,
        email,
        role:0
      }
      jwt.sign(payload, JWT_SECRET, {
        expiresIn: '1d' //one day
      }, (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, userDetails, message: 'Login Successful', ack: true});
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

module.exports = router;