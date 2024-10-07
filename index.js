const express = require("express");
const app = express();

const contactusRoutes = require("./routes/Contactus")
const userRoutes = require("./routes/User");
const paymentRoutes = require("./routes/Payments");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");

const Database = require("./config/Database");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const fileUpload = require("express-fileupload");
const {cloudinaryconnect} = require("./config/Cloudinary")

const dotenv = require("dotenv");
dotenv.config();

const PORT = 5000;
Database.connect();

app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

cloudinaryconnect();

app.use("/api/auth",userRoutes);
app.use("/api/contact",contactusRoutes);
app.use("/api/payment",paymentRoutes);
app.use("/api/course",courseRoutes);  
app.use("/api/profile",profileRoutes);

  app.get("/api/welcome", (req, res) => {
    res.status(200).json({
      message: "Welcome to API",
    });
  });
  app.use("/api/products", (req, res) => {
    return res.status(200).json({
      message: 'This is new feature change, a new routee  Jenil'
    })
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

