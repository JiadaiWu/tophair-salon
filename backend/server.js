require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
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