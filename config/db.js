
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MongoURL);
        console.log('MongoDB is connected');
    } catch (error) {
        console.log('MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
