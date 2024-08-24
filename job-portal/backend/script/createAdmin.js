const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust the path to your User model

async function createAdmin() {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect('mongodb+srv://ansheenadp:anshi123@cluster0.c0mufif.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Check if an admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('An admin already exists');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('admin2024', 10);

    // Create a new admin user
    const newAdmin = new User({
      name: 'Ansheena',
      email: 'ansheenadp@gmail.com',
      password: hashedPassword,
      role: 'admin',
    });

    await newAdmin.save();
    console.log('Admin created successfully');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    mongoose.disconnect();
  }
}

createAdmin();
