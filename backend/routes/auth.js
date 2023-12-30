const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

// Registration route to create new user  --request post:http://localhost/api/auth/createuser
router.post(
  '/createuser',
  [
    // Validation middleware for registration
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  async (req, res) => {
    let success = false;
    
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({success, error: 'Email already exists' });
    }

    // Hash the password using bcryptjs
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
 
      // Create a new user instance with the hashed password
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        // Add other fields as needed
    });

      // Save the user to the database
      await user.save();

       // Generate a JWT token
       const token = jwt.sign({ userId: user._id }, 'your_secret_key'); // { expiresIn: '1h' });

      // Send a successful response with the token
      // res.status(201).json({success, message: 'User created successfully', user });
      success = true;
      res.json({ success, token });
    } catch (error) {
      // Check for duplicate key error (E11000)
      // if (error.code === 11000 && error.keyPattern && error.keyValue) {
      //   res.status(400).json({ error: 'Email already exists' });
      // } else {
        // Handle other errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      // }
    }
  }
);
  
// ___________________________________________________________________________________________________________________________________________________________________________________
// Login route                     --request post:http://localhost/api/auth/login
router.post(
  '/login',
  [
    // Validation middleware for login
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  async (req, res) => {
    let success = false;
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if the user exists
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        success = false;
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check if the provided password matches the hashed password in the database
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordValid) {
        success = false;
        return res.status(401).json({success, error: 'Invalid credentials' });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user.id }, 'your_secret_key');  //, { expiresIn: '1h' });
      success= true;
      // Send a successful response with only the token
      res.json({success, token });
    } catch (error) {
      // Handle other errors
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);



// ___________________________________________________________________________________________________________________________________________________________________________________
// Protected route example (Get the loggedin user details)                 --request get:http://localhost/api/auth/getuser

// The fetchuser middleware is used here to ensure that only requests with a valid token can access the route.
router.get('/getuser', fetchuser, async (req, res) => {
  try {
    // Access user information from decoded JWT
    const userId = req.user.id;

    // // Log decoded token information
    // const decodedToken = jwt.decode(req.header('Authorization'), { complete: true });
    // console.log('Decoded Token:', decodedToken);

     // Fetch user details from the database excluding the password field
     const user = await User.findById(userId).select('-password');

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'Unauthorized, enter3 a valid token' });
    }

    // Return all user details in the response
    res.json({ user });
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;













