import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  productIds: [{
    productId: {
        type:String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hook to update the updatedAt field
CartSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Check if the model is already compiled
const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;
