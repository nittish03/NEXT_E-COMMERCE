import mongoose from 'mongoose';
const verificationTokenSchema = new mongoose.Schema({
    identifier: { 
      type: String, 
      required: true 
    },
    token: { 
      type: String, 
      required: true 
    },
    expires: { 
      type: Date, 
      required: true 
    }
  }, { 
    collection: 'verification_tokens' 
  });
  
  verificationTokenSchema.index({ identifier: 1, token: 1 }, { unique: true });
  
  const VerificationToken = mongoose.models.verificationTokens ||  mongoose.model('verificationTokens', verificationTokenSchema);

  export default VerificationToken;