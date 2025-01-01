const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    // Debug logs
    console.log('Received registration data:', req.body);
    
    try {
        const { name, email, password, isGrower, businessName, zipCode } = req.body;
        
        // Log extracted fields
        console.log('Extracted fields:', { 
            name, 
            email, 
            isGrower, 
            businessName, 
            zipCode 
        });

        // Create new user
        const user = new User({
            name,
            email,
            password,
            isGrower,
            businessName,
            zipCode
        });

        await user.save();

        // Create token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isGrower: user.isGrower,
                businessName: user.businessName,
                zipCode: user.zipCode
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).json({
            error: 'Registration failed',
            details: error.message
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValidPassword = await user.validatePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isGrower: user.isGrower,
                businessName: user.businessName,
                zipCode: user.zipCode
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({
            error: 'Login failed',
            details: error.message
        });
    }
});

module.exports = router;