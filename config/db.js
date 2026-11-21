
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return;
        }

        await mongoose.connect(process.env.MongoURL);

        console.log('MongoDB is connected');
    } catch (error) {
        console.log('MongoDB Connection Error:', error.message);
        throw error;
    }
};

module.exports = connectDB;
