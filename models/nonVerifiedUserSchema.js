import mongoose from "mongoose";

const nonVerifiedUserSchema = new mongoose.Schema({
  id: { 
    type: String, 
    default: () => new mongoose.Types.ObjectId() 
  },
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    unique: true, 
    required: true 
  },
  hashedPassword: { 
    type: String, 
    required: true 
  },
  otp: { 
    type: Number, 
    required: true 
  },
  otpExpiry: { 
    type: Date, 
    required: true 
  }
});

const NonVerifiedUser = mongoose.models.nonVerifiedUsers ||  mongoose.model('nonVerifiedUsers', nonVerifiedUserSchema);

export default NonVerifiedUser;