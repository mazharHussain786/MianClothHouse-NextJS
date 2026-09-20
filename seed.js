import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import { userModel } from './src/lib/models/user.js';




const MONGO_URI ="mongodb://mianmazhar302:lYcaCCm8Qir9Rg2k@ac-86zllqy-shard-00-00.dvk7mwk.mongodb.net:27017,ac-86zllqy-shard-00-01.dvk7mwk.mongodb.net:27017,ac-86zllqy-shard-00-02.dvk7mwk.mongodb.net:27017/?replicaSet=atlas-7hkig1-shard-0&ssl=true&authSource=admin"


async function seedUser() {
  try {

    // await dbConnect()
    await mongoose.connect(MONGO_URI);

    const fullName = 'Mian Admin';
    const phone = '03027726309';
    const password = 'mian301@';

   const isTrue= await bcrypt.compare("asdf302@","$2b$10$dURdZ7qLTQTTMe2YrKapSu2i2WJIxCtloycyPyK800e3WK/gW6IgG")
      console.log(isTrue)
    // Check if user exists

     await userModel.deleteMany({})
    const existingUser = await userModel.findOne({ phone });
    if (existingUser) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      fullName,
      phone,
      password: hashedPassword,
      role: "admin",
    });
   const data= await user.save();
    console.log(data)

    console.log('✅ Admin user created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding user:', error);
    process.exit(1);
  }
}

seedUser();
