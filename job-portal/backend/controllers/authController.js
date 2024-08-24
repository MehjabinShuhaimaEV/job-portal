const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Register function
exports.registerUser = async (req, res) => {
  
  const { name, email, password } = req.body; 
  console.log(name)
  console.log(email)
  console.log(password)

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'user', // Default to 'user' role
    });
    console.log("user registerd succesfully")

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
    
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login function
exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      
      return res.status(401).json({ message: 'Invalid email ' });
      
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Respond with the token and user information
    res.json({ token, user: { id: user._id, role: user.role } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Signup function




// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profilePictures'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.email}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
}).single('profilePicture'); // 'profilePicture' is the field name in the frontend form

// Signup function
exports.signup = async (req, res) => {
  
  
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const { name, email, password, phone, address, education, skills } = req.body;
    const profilePicture = req.file ? req.file.path : null;

    console.log(name);
    console.log(email);
    console.log(password);

    try {
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create a new user
      user = new User({
        name,
        email,
        password,
        phone,
        address,
        education,
        skills,
        profilePicture,
        role: 'user'
      });

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save the user to the database
      await user.save();

      // Generate a JWT token
      const payload = { id: user._id, role: user.role };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

      res.status(201).json({ token, user: { id: user._id, role: user.role },message: 'Successfully Signup' });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
};



exports.forgotpassword = async (req, res) => {
  

  try {
      const { email } = req.body;
      
      const user = await User.findOne({ email });
      

      if (!user) {
         
          return res.status(404).json({ message: 'User not found' });
      }

     
      const newPassword = crypto.randomBytes(4).toString('hex');
     

      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedPassword; 
      await user.save();
      

      const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: 'cuawmca024@uoc.ac.in',
              pass: 'utsyzxarudxaakqr',
          },
      });
      

      const mailOptions = {
          from: 'cuawmca024@uoc.ac.in',
          to: email,
          subject: 'Your New Password',
          text: `Your new password is: ${newPassword}`,
      };
      

      transporter.sendMail(mailOptions, (error) => {
          if (error) {
              console.log("error in sending mail option");
              return res.status(500).json({ message: 'Error sending email' });
          }
          console.log("password sent to mail");
          res.status(200).json({ message: 'New password sent to your email' });
      });
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
};
