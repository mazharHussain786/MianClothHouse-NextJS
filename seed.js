import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import { userModel } from './src/lib/models/user.js';



const MONGO_URI = process.env.MONGODB_URI || "mongodb://mianmazhar302:efha7t9GUwzXMBxQ@ac-86zllqy-shard-00-00.dvk7mwk.mongodb.net:27017,ac-86zllqy-shard-00-01.dvk7mwk.mongodb.net:27017,ac-86zllqy-shard-00-02.dvk7mwk.mongodb.net:27017/?replicaSet=atlas-7hkig1-shard-0&ssl=true&authSource=admin" 

async function seedUser() {
  try {

    // await dbConnect()
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
