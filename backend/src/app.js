const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

/* Routes */
const authRoutes = require('./routes/auth.routes');
const chatRoutes = require("./routes/chat.routes");

const app = express();

/* using middlewares */
app.use(cors({
    origin: [
        'http://localhost:5173'// Local dev  
        
    ],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

/* Using Routes */
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

/* Wildcard route for React Router (SPA) */
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;
