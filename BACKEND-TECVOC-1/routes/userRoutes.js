const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const conectarMongoDB = require('../config/db');
const User = require('../models/User');

// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
  const { email, password, role, name, surname, age, educationLevel, acceptTerms } = req.body;
  try {
    if (role === "user" && (!name || !surname || !age || !educationLevel || !acceptTerms)) {
      return res.status(400).json({ message: 'All fields are required for user registration' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({ email, password: hashedPassword, role, name, surname, age, educationLevel, acceptTerms });
    await newUser.save();

    res.status(200).json({
      message: 'User registered successfully',
      user: {
        email: newUser.email,
        role: newUser.role,
        name: newUser.name,
        surname: newUser.surname,
        age: newUser.age,
        educationLevel: newUser.educationLevel,
        acceptTerms: newUser.acceptTerms
      }
    });
  } catch (err) {
    console.error('Error in /register:', err);
    res.status(500).json({ message: 'Failed to register user', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(`Login attempt for email: ${email}`);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log('Invalid password');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        role: user.role,
        name: user.name,
        surname: user.surname,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Failed to login', error: err.message });
  }
});


module.exports = router;



// // Ruta para iniciar sesión
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   console.log(`Login attempt for email: ${email}`);

//   try {
//     const db = await conectarMongoDB(); // Obtener la conexión a MongoDB
//     const usersCollection = db.collection('users'); // Obtener la colección de usuarios

//     const user = await usersCollection.findOne({ email });
//     if (!user) {
//       console.log('User not found');
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       console.log('Invalid password');
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user._id, role: user.role, userName: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Failed to login', error: err.message });
//   }
/// });