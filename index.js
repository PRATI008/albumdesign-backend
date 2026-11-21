const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const server = express();

const connectDB = require('./config/db');

// Middleware
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Home Route
server.get('/', (req, res) => {
    res.send('Welcome to Singh Album');
});

// All Routes
const bookingRoutes = require('./routes/bookingRoutes');
server.use('/api', bookingRoutes);

server.use('/api/auth', require('./routes/authRoutes'));

const userRoutes = require('./routes/userRoutes');
server.use('/api', userRoutes);

const enquiryRoutes = require('./routes/enquiryRoutes');
server.use('/api', enquiryRoutes);

const packageRoutes = require('./routes/packageRoutes');
server.use('/api', packageRoutes);

const designRoutes = require('./routes/designRoutes');
server.use('/api', designRoutes);

const siteSettingRoutes = require('./routes/siteSettingRoutes');
server.use('/api', siteSettingRoutes);

// Export for Vercel
module.exports = server;

// Local Development
if (require.main === module) {
    const PORT = process.env.PORT || 4000;

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
