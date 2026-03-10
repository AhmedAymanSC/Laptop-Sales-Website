const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./Product");
const Request = require('./request_model')
const VisaCard = require('./VisaCard')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const User = require('./user.model')

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Adjust origin as needed
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Respond OK to preflight
  }
  next();
});

app.use(cors({
  origin: "http://localhost:3000", // Frontend URL
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Laptop Sales Website Backend is running!', status: 'OK' });
});

mongoose.connect("mongodb+srv://kareempogba:euboV3iBpCrIyJMh@ourcluster.qaupx.mongodb.net/labtopDB?retryWrites=true&w=majority")

  .then(() => {
    console.log("Connected to the MongoDB database");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

app.post("/addproduct", async (req, res) => {
  try {
    console.log("Request to add product:", req.body); // Debugging log

    if (isNaN(req.body.price) || req.body.price <= 0) {
      return res.status(400).send("Price must be a positive number");
    }

    const exist = await Product.findOne({ id: req.body.id });
    if (exist) {
      return res.status(400).send("Product already exists");
    }

    const product = new Product(req.body);
    await product.save();

    res.status(200).send("Product added successfully");
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
});


// Mock products data
const mockProducts = [
  {
    id: 1,
    name: "Dell Inspiron 15",
    price: 599,
    description: "15-inch FHD Display, Intel i5, 8GB RAM, 256GB SSD",
    image: "/product-images/dell-1.jpg",
    hoverImage: "/product-images/dell-2.jpg",
    category: "Dell",
    rating: 4.5,
    reviews: [
      { author: "Ahmed", comment: "Great quality and good price", rating: 5 },
      { author: "Fatima", comment: "Excellent performance", rating: 4 }
    ]
  },
  {
    id: 2,
    name: "HP Pavilion 14",
    price: 549,
    description: "14-inch HD Display, AMD Ryzen 5, 8GB RAM, 512GB SSD",
    image: "/product-images/hp-1.jpg",
    hoverImage: "/product-images/hp-2.jpg",
    category: "HP",
    rating: 4.3,
    reviews: [
      { author: "Mohammed", comment: "Perfect for work", rating: 4 },
      { author: "Noor", comment: "Very fast", rating: 5 }
    ]
  },
  {
    id: 3,
    name: "Lenovo ThinkPad X1",
    price: 999,
    description: "13.3-inch FHD Display, Intel i7, 16GB RAM, 512GB SSD",
    image: "/product-images/lenovo-1.jpg",
    hoverImage: "/product-images/lenovo-2.jpg",
    category: "Lenovo",
    rating: 4.8,
    reviews: [
      { author: "Sara", comment: "Professional and amazing", rating: 5 },
      { author: "Hassan", comment: "Long battery life", rating: 5 }
    ]
  },
  {
    id: 4,
    name: "ASUS VivoBook 15",
    price: 649,
    description: "15.6-inch FHD Display, AMD Ryzen 7, 16GB RAM, 512GB SSD",
    image: "/product-images/acer-1.jpg",
    hoverImage: "/product-images/acer-2.jpg",
    category: "ASUS",
    rating: 4.6,
    reviews: [
      { author: "Ali", comment: "Beautiful design", rating: 5 },
      { author: "Layla", comment: "Competitive prices", rating: 4 }
    ]
  },
  {
    id: 5,
    name: "MacBook Air M1",
    price: 1299,
    description: "13.3-inch Retina Display, Apple M1, 8GB RAM, 256GB SSD",
    image: "/product-images/mac1.jpg",
    hoverImage: "/product-images/mac2.jpg",
    category: "Apple",
    rating: 4.9,
    reviews: [
      { author: "Omar", comment: "Best in its class", rating: 5 },
      { author: "Leena", comment: "Excellent performance", rating: 5 }
    ]
  },
  {
    id: 6,
    name: "Microsoft Surface Laptop 4",
    price: 1399,
    description: "13.5-inch PixelSense, Intel i7, 8GB RAM, 512GB SSD",
    image: "/product-images/dell-3.jpg",
    hoverImage: "/product-images/dell-4.jpg",
    category: "Microsoft",
    rating: 4.7,
    reviews: [
      { author: "Yasmin", comment: "Beautiful display", rating: 5 },
      { author: "Karim", comment: "Light and portable", rating: 4 }
    ]
  }
];

app.get("/products/:category?", async (req, res) => {
  console.log("Received request for /products");
  try {
    const category = req.params.category;

    // Return mock data immediately instead of querying MongoDB
    if (!category) {
      console.log("Returning all mock products");
      return res.json(mockProducts);
    }

    // Filter by category
    const filteredProducts = mockProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    console.log(`Filtered products for category ${category}:`, filteredProducts);
    res.json(filteredProducts);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// app.get("/product", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

app.put("/updateproduct/:id", async (req, res) => {
  try {
    if (isNaN(req.body.price) || req.body.price <= 0) {
      return res.status(400).send("Price must be a positive number");
    }
    const updatedProduct = await Product.findOneAndUpdate(
      { id: req.params.id },
      {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        rating: req.body.rating,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(500).send("Product not found");
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/deleteproduct/:id", async (req, res) => {
  const { id } = req.params; // Ensure 'id' is retrieved from params
  try {
    const deletedProduct = await Product.findOneAndDelete({ id: id });
    if (!deletedProduct) {
      return res.status(404).send("Product not found");
    }
    res.send("Product deleted successfully");
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).send("Server error: " + err.message);
  }
});

app.get("/request/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const getRequest = await Request.findById(id);
    if (!getRequest) {
      return res.status(404).send({ message: `Request with id ${id} not found` });
    }

    res.status(200).send(getRequest);
  } catch (error) {
    res.status(500).send({ message: `Error retrieving request: ${error.message}` });
  }
});

app.get("/requests", async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).send({ message: `Error retrieving requests: ${error.message}` });
  }
});

app.post('/request', async (req, res) => {
  const { Name, Address, Email, phoneNumber } = req.body;
  try {
    const request = new Request({ Name, Address, Email, phoneNumber });
    const savedRequest = await request.save();
    const id = savedRequest._id;
    res.status(201).send(`Request with name "${Name}" added successfully. Your request number is "${id}"`);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});



app.delete("/request/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedRequest = await Request.findByIdAndDelete(id);
    if (!deletedRequest) {
      return res.status(404).send({ message: "Request not found" });
    }
    res.status(200).send({ message: `Request with id ${id} deleted successfully` });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.put("/request/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedRequest = await Request.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedRequest) {
      return res.status(404).send({ message: "Request not found" });
    }
    res.status(200).send(updatedRequest);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.post('/addVisaCard', async (req, res) => {
  const { Name, CardNumber, CVV } = req.body;
  try {
    const visaCard = new VisaCard({ Name, CardNumber, CVV });
    const savedVisaCard = await visaCard.save();
    res.status(200).send(savedVisaCard);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.get("/visaCards", async (req, res) => {
  try {
    const visaCards = await VisaCard.find();
    res.status(200).json(visaCards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/deleteVisaCard/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedVisaCard = await VisaCard.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });

    if (!deletedVisaCard) {
      return res.status(404).send("VisaCard not found");
    }
    res.status(200).send("VisaCard deleted successfully");
  } catch (err) {
    console.error("Error deleting VisaCard:", err);
    res.status(500).send("Server error: " + err.message);
  }
});

app.put("/updateVisaCard/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedVisaCard = await VisaCard.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedVisaCard) {
      return res.status(404).send("VisaCard not found");
    }
    res.status(200).send(updatedVisaCard);
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
});
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

app.get('/user/:id', async (req, res) => {

  try {
    // req id 
    const id = req.params.id;
    // find by id in users 
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

app.post('/adduser', async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).send('Full Name, Email, and Password are required');
  }

  try {
    // Check if user already exists
    if (await User.findOne({ email })) {
      return res.status(400).send(`User with email "${email}" already exists`);
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    await user.save();
    res.status(200).send('User added successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/user/:id', async (req, res) => {

  // req id 
  const id = req.params.id;
  // delet by id in users 

  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: `cannot find any user with ID ${id}` })
    }
    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    //find user by ID and update
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: `User with Id ${id} not found` });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and Password are required');
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send('Invalid password');
    }

    res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(400).send('No user data provided');
    }

    // If you're passing user ID or email in headers, extract it
    const userId = req.headers['user-id'];

    if (!userId) {
      return res.status(400).send('User ID required');
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 404 Handler - must be after all routes
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    endpoint: req.originalUrl,
    method: req.method
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

try {
  app.listen(5000, () => {
    console.log(`Server is running on port ${5000}`);
  });
} catch (error) {
  console.error(`Failed to start the server: ${error.message}`);
}