import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { 
    type: String, 
    default: () => new mongoose.Types.ObjectId() 
  },
  name: { 
    type: String, 
    sparse: true
  },
  email: { 
    type: String, 
    unique: true, 
    sparse: true, 
  },
  hashedPassword: { 
    type: String, 
  },
  image: { 
    type: String, 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, { 
  timestamps: { 
    createdAt: 'createdAt', 
    updatedAt: 'updatedAt' 
  } 
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
