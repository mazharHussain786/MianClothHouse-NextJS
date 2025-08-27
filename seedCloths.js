import {clothModel} from "./src/lib/models/cloth.js"
import mongoose from "mongoose";
const MONGO_URI = process.env.MONGODB_URI || "MONGODB_URI=mongodb://mianmazhar302:X3V1tUsre2WrlsEt@ac-86zllqy-shard-00-00.dvk7mwk.mongodb.net:27017,ac-86zllqy-shard-00-01.dvk7mwk.mongodb.net:27017,ac-86zllqy-shard-00-02.dvk7mwk.mongodb.net:27017/?replicaSet=atlas-7hkig1-shard-0&ssl=true&authSource=admin" 


  const productList = [
  {
    title: "Elegant Black Embroidered Lawn Suit (Ladies)",
    price: 4500,
    category:"women",
    images: ["https://empirescollection.pk/wp-content/uploads/Aisling-original-brand-suit-buy-women-new-dress-designs-winters-collection-buy-online-2024-Pakistan-girls-online.jpg", "https://empirescollection.pk/wp-content/uploads/Aisling-original-brand-suit-buy-women-new-dress-designs-winters-collection-buy-online-2024-Pakistan-girls-online-delivery.jpg"],
  },
  {
    title: "Pastel Blue Organza Party Suit (Ladies)",
    price: 6200 ,
    category:"women",
    images: ["https://img.drz.lazcdn.com/static/pk/p/b34bd55f8942e48b2ca23bf6ba4d6a1a.jpg_720x720q80.jpg", "/women-category-2.jpg"],
  },
  {
   category:"women",
    title: "Maroon Gharara Set with Dupatta (Ladies)",
    price: 7800,
    images: ["https://img.drz.lazcdn.com/static/pk/p/30257aab853377b64e1c5224eae908e0.jpg_960x960q80.jpg_.webp", "/women-category-3.jpg"],
  },
  {
    category:"women",
    title: "Soft Pink Embroidered Chiffon Suit (Ladies)",
    price: 5900,
    images: ["https://img.drz.lazcdn.com/static/pk/p/30257aab853377b64e1c5224eae908e0.jpg_960x960q80.jpg_.webp", "/women-category-3.jpg"],
  },
    {
        category:"women",
    title: "Soft Pink Embroidered Chiffon Suit (Ladies)",
    price: 5900,
    images:["https://www.5050.pk/uploaded/product/WhatsApp_Image_2022-02-28_at_4_35_09_PM.jpeg"]
  },

    {
        category:"women",
    title: "Soft Pink Embroidered Chiffon Suit (Ladies)",
    price: 5900,
    images:["https://www.5050.pk/uploaded/product/WhatsApp_Image_2022-02-28_at_4_35_09_PM.jpeg"]

  },
];
async function seedCloths() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');

    await clothModel.deleteMany(); // Clear old data
    await clothModel.insertMany(productList); // Insert new data

    console.log('✅ Cloth data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding cloths:', error);
    process.exit(1);
  }
}

seedCloths();