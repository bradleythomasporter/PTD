const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    isGrower: {
        type: Boolean,
        default: false
    },
    businessName: {
        type: String,
        required: function() { 
            return this.isGrower; 
        },
        trim: true
    },
    zipCode: {
        type: String,
        required: function() { 
            return this.isGrower; 
        },
        trim: true
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// Method to validate password
userSchema.methods.validatePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;