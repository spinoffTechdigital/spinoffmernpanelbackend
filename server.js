require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./route/userRoutes");
const directorRoutes = require("./route/directorRoutes");
const contactRoutes = require("./route/contactRoutes");
const logRoutes = require("./route/logRoutes");
const committeeRoutes = require("./route/committeeRoutes");
const financialRoutes = require('./route/financialsroute');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use('/api/auth', userRoutes);
app.use('/api/director',directorRoutes);
app.use('/api/contact',contactRoutes);
app.use('/api/clicklogs',logRoutes);
app.use('/api/committee',committeeRoutes);
app.use('/api/financials',financialRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
