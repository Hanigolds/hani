
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const photoRoute = require("./routes/photoRoute");
const cartRoute = require("./routes/cartRoute");
const silverRoute = require("./routes/silverRoute");
const goldRoute = require("./routes/goldRoute");
dotenv.config();
app.use(express.json());
app.use(cors({
  origin: '*', // Allow all origins (adjust to specific origin for security)
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));


// todo json middleware app.use(json());
// app.use(cors());
// ! data base connetion
const dbConnect = async () => {
  // mongodb+srv://mrkec_243122:<db_password>@cluster0.j5hwsil.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
  try {
    const res = await mongoose.connect(
      process.env.MONGO_URL
    );
    if (res) {
      console.log("connection is sucessfully connected");
    }
  } catch (error) {
    console.log(error.message);
  }
};
dbConnect();

// todo all routes
app.use("/api/auth", authRoute);
// todo user routes
app.use("/api", userRoute);
// ? category routees
app.use("/api", categoryRoute);
// ! product routes
app.use("/api", productRoute);
// ? all photo routes
app.use("/api", photoRoute);
// ! add to cart routes
app.use("/api/cart", cartRoute);
app.use("/api/silver", silverRoute);
app.use("/api/gold", goldRoute);

// todo for live server checking
app.get("/", (req, res) => {res.send("<h1>listening the port server is runing</h1>")});

// ? port is listening
const PORT = process.env.PORT || 8000;

app.listen(PORT, (req, res) => {
  console.log("server is running and successful");
});
