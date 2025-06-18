const mongoose = require('mongoose');
const dotenv = require('dotenv');
const config = require('../../config');

const connectDB = async () => {
    const url = `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@cluster0.undzlhd.mongodb.net/${config.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    try {
        await mongoose.connect(url);
        console.log('Database connected succesfully!');
    } catch (error) {
        console.error('Database connection error: ', error);
        process.exit(1);
    }
}

module.exports = connectDB;