const mongoose = require('mongoose');

const USER = 'miguelmunnoz';
const PASSWORD = 'admin1234';
const DBNAME = 'TFM_DB';

const connectDB = async () => {
    const url = `mongodb+srv://${USER}:${PASSWORD}@cluster0.undzlhd.mongodb.net/${DBNAME}?retryWrites=true&w=majority&appName=Cluster0`
    try {
        await mongoose.connect(url);
        console.log('Database connected succesfully!');
    } catch (error) {
        console.error('Database connection error: ', error);
        process.exit(1);
    }
}

module.exports = connectDB;