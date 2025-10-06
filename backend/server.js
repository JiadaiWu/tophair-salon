require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// 添加健康检查端点，不依赖数据库
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// 尝试连接数据库，但不阻塞服务器启动
connectDB().catch(err => {
    console.error('Database connection failed:', err.message);
    console.log('Server will continue without database connection');
});

app.use(cors({
   origin: [
    /\.vercel\.app$/,
    'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Server with routes!',
        status: 'success'
    });
});

app.use('/api/appointments', require('./routes/appointments'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});