import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: String,
  facebookId: String,
  githubId: String,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatar: String,
  provider: String
}, {
  timestamps: true
});

// Compound index to ensure unique users across providers
userSchema.index({ googleId: 1 }, { sparse: true });
userSchema.index({ facebookId: 1 }, { sparse: true });
userSchema.index({ githubId: 1 }, { sparse: true });

export default mongoose.model('User', userSchema);