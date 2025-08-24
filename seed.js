import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import { userModel } from './src/lib/models/user.js';


const MONGO_URI = 'mongodb://127.0.0.1:27017/cloth'; 

async function seedUser() {
  try {
    await mongoose.connect(MONGO_URI);

    const username = 'admin';
    const password = '123456';

    // Check if user exists
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new userModel({ username, password: hashedPassword });
    await user.save();

    console.log('✅ Admin user created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding user:', error);
    process.exit(1);
  }
}

seedUser();
