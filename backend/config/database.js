const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI environment variable is not set');
        }
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connect successful: ${conn.connection.host}`);
        return conn;
    } catch(error){
        console.error('Database connection failed:', error.message);
        throw error; // 重新抛出错误，让调用者处理
    }
}

module.exports = connectDB;