import mongoose from 'mongoose';

const ClothSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      default: 'Elegant design with premium fabric. Perfect for casual and party wear.',
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    images: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: 'At least one image is required',
      },
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be positive'],
    },
    discountPrice: {
      type: Number,
      min: [0, 'Discount price must be positive'],
      validate: {
        validator: function (value) {
          // Discount price should not be greater than price
          return !value || value <= this.price;
        },
        message: 'Discount price cannot be greater than actual price',
      },
    },
    category: {
      type: String,
      enum: ['men', 'women'],
      required: [true, 'Category is required'],
    },
    colors: {
      type: [String], // Array of colors like ["Red", "Blue"]
      default: [], // Optional field
    },
  },
  { timestamps: true }
);

export const clothModel =
  mongoose.models.Cloth || mongoose.model("Cloth", ClothSchema);
