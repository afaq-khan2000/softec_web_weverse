const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicture: {
      type: String,
      default: 'https://picsum.photos/200/200',
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
      },
    ],
    cart: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Item',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    isBlacklisted: {
      type: Boolean,
      default: false,
    },
    blacklistReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;

    return next();
  } catch (error) {
    return next(error);
  }
});

const addServerUrl = (profilePicture) => {
  if (!profilePicture?.startsWith('http')) {
    return `${process.env.SERVER_URL}/${profilePicture}`;
  }

  return profilePicture;
};

userSchema.pre('find', function (next) {
  for (let i = 0; i < this.length; i++) {
    this[i].profilePicture = addServerUrl(this[i].profilePicture);
  }

  return next();
});

userSchema.pre('findOne', function (next) {
  this.profilePicture = addServerUrl(this.profilePicture);
  return next();
});

userSchema.pre('findOneAndUpdate', function (next) {
  this.profilePicture = addServerUrl(this.profilePicture);
  return next();
});

userSchema.methods.isValidPassword = async function (newPassword) {
  return await bcrypt.compare(newPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
