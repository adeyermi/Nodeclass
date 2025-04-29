const mongoose = require('mongoose');
const dotEnv = require('dotenv');
dotEnv.config();
require('dotenv').config();

const mongodbUri = process.env.MONGO_URI;

if (!mongodbUri) {
    console.error('MONGO_URI is not defined in the .env file');
    process.exit(1);  // Exit the app if URI is not set
}

const connectToDb = async () => {
    console.log('Connecting to DB.....');
    try {
        const connected = await mongoose.connect(mongodbUri);
        if (connected) {
            console.log('MongoDB is connected ✅');
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectToDb;