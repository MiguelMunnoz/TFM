const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); // ¡No olvides esto para cargar las variables .env!

const connectDB = async () => {
    const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.undzlhd.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority&appName=Cluster0`
    try {
        await mongoose.connect(url);
        console.log('Database connected succesfully!');
    } catch (error) {
        console.error('Database connection error: ', error);
        process.exit(1);
    }
}

module.exports = connectDB;