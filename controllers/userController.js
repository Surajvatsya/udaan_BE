const User = require('../models/User');




async function createUser(userData) {
    try {
        const user = await User.create(userData);
        console.log('User created:', user.toJSON());
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}


async function getUserById(userId) {
    try {
        const user = await User.findByPk(userId);
        if (user) {
            console.log('User found:', user.toJSON());
            return user;
        } else {
            console.log('User not found');
            return null;
        }
    } catch (error) {
        console.error('Error retrieving user:', error);
        throw error;
    }
}


async function getAllUsers() {
    try {
        const users = await User.findAll();
        console.log('All users:', users.map(user => user.toJSON()));
        return users;
    } catch (error) {
        console.error('Error retrieving users:', error);
        throw error;
    }
}


async function updateUser(userId, updateData) {
    try {
        const user = await User.findByPk(userId);
        if (user) {
            await user.update(updateData);
            console.log('User updated:', user.toJSON());
            return user;
        } else {
            console.log('User not found');
            return null;
        }
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}


async function deleteUser(userId) {
    try {
        const user = await User.findByPk(userId);
        if (user) {
            await user.destroy();
            console.log('User deleted');
            return true;
        } else {
            console.log('User not found');
            return false;
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

module.exports = {
    User,
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
};
