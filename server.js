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
const shareholdingRoutes = require('./route/shareHoldingRoutes');
const policyRoutes = require('./route/policyRoute');
const rhpRoutes = require('./route/rhpRoute');
const drhpRouts = require('./route/drhpRoute');
const prospectusRouts = require('./route/ProspectusRoute');
const DetailsofRegistrarRoutes = require('./route/DetailsofRegistrarRoutes');
const InvestorGrievanceRoutes = require('./route/InvestorGrievanceRoute');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use('/uploads', express.static('uploads'));
app.use('/committeeimages', express.static(path.join(__dirname, 'uploads/committeeimages')));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use('/api/auth', userRoutes);
app.use('/api/director',directorRoutes);
app.use('/api/contact',contactRoutes);
app.use('/api/clicklogs',logRoutes);
app.use('/api/committee',committeeRoutes);
app.use('/api/financials',financialRoutes);
app.use('/api/share',shareholdingRoutes);
app.use('/api/policy',policyRoutes);
app.use('/api/rhp',rhpRoutes);
app.use('/api/drhp',drhpRouts);
app.use('/api/prospectus',prospectusRouts);
app.use('/api/DetailsofRegistrar',DetailsofRegistrarRoutes);
app.use('/api/InvestorGrievance',InvestorGrievanceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
