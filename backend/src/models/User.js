const bcrypt = require('bcryptjs');

// Simple in-memory storage for development (when MongoDB is not available)
let inMemoryUsers = [];
let nextId = 1;

// User model with fallback methods for development without MongoDB
const UserModel = {
    findOne: async (query) => {
        if (query.email) {
            return inMemoryUsers.find(user => user.email === query.email.toLowerCase());
        }
        return null;
    },

    create: async (userData) => {
        const existingUser = inMemoryUsers.find(user => user.email === userData.email.toLowerCase());
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash password manually
        const hashedPassword = await bcrypt.hash(userData.password, 12);
        const newUser = {
            _id: nextId++,
            ...userData,
            password: hashedPassword,
            email: userData.email.toLowerCase(),
            role: userData.role || 'user',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        inMemoryUsers.push(newUser);
        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    },

    findById: async (id) => {
        return inMemoryUsers.find(user => user._id === parseInt(id));
    },

    findByIdAndUpdate: async (id, updateData, options) => {
        const userIndex = inMemoryUsers.findIndex(user => user._id === parseInt(id));
        if (userIndex === -1) return null;

        inMemoryUsers[userIndex] = {
            ...inMemoryUsers[userIndex],
            ...updateData,
            updatedAt: new Date()
        };

        const { password, ...userWithoutPassword } = inMemoryUsers[userIndex];
        return userWithoutPassword;
    },

    // Helper method for password comparison
    comparePassword: async (user, candidatePassword) => {
        return await bcrypt.compare(candidatePassword, user.password);
    }
};

module.exports = UserModel;