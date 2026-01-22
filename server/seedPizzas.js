const mongoose = require("mongoose");
require("dotenv").config();

const Pizza = require("./models/Pizza");

const pizzas = [
  {
    name: "Veggie Delight",
    price: 249,
    image: "https://images.unsplash.com/photo-1601924582971-5f7a6f0d3f47?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=2a3f8b6ec3e3178d6d3bd0e2a6b1f0f3",
    description: "Loaded with bell peppers, onions, mushrooms & olives."
  },
  {
    name: "BBQ Chicken",
    price: 349,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=6c6928eb7a1c7f6d3f9a83d0b2b7a637",
    description: "Smoky BBQ sauce, shredded chicken, red onions and cilantro."
  },
  {
    name: "Hawaiian",
    price: 329,
    image: "https://images.unsplash.com/photo-1548365328-8d5f4b3c3f3b?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=aa2f3d7e07d0f4b9c6d9b1c3f2a7d8d9",
    description: "Sweet pineapple, ham, and melted mozzarella."
  },
  {
    name: "Four Cheese",
    price: 379,
    image: "https://images.unsplash.com/photo-1612874740046-433f9f1c3b4a?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=3d7c2b96c6a2e8b5f0b8e9a1b0c8f5d0",
    description: "Mozzarella, parmesan, gorgonzola and ricotta — cheesy heaven."
  },
  {
    name: "Spicy Mexicana",
    price: 359,
    image: "https://images.unsplash.com/photo-1601924638867-3ec4b6e3b5f2?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=9c7a5f6e8d6f4b2a3c1e0f7d6b9a8c4e",
    description: "Jalapeños, spicy chorizo, red onion & chilli flakes."
  },
  {
    name: "Truffle Mushroom",
    price: 419,
    image: "https://images.unsplash.com/photo-1594007659272-6e6008b91e16?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
    description: "Creamy truffle oil, wild mushrooms & fontina cheese."
  }
];

async function seed() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error("MONGO_URI missing in .env");
      process.exit(1);
    }

    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    for (const p of pizzas) {
      const updated = await Pizza.findOneAndUpdate(
        { name: p.name },
        { $set: p },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`Upserted pizza: ${updated.name}`);
    }

    console.log("Seed complete.");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();