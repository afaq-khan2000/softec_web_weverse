const User = require('../models/User');

const seedAdmin = async () => {
  try {
    await User.deleteMany({
      isAdmin: true,
    });

    const admin = await User.create({
      name: 'Admin',
      email: 'admin@gamehub.com',
      dob: new Date(),
      gender: 'male',
      password: '12345678',
      isAdmin: true,
    });

    console.log('Admin created successfully!');
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedAdmin;
