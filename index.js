const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3010;

app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admin@123',
    database: 'saddam'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('❌ Database connection failed:', err.stack);
        return;
    }
    console.log('✅ Connected to MySQL');
});

// Home Route
app.get('/', (req, res) => {
    res.send('Server is Running');
});

// Route: Insert Data
app.get('/InsertData/:data', (req, res) => {
    const { data } = req.params;

    if (!data) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const sql = 'INSERT INTO test (data) VALUES (?)';
    db.query(sql, [data], (err, result) => {
        if (err) {
            console.error('❌ Insert error:', err);
            return res.status(500).json({ error: 'Failed to insert data' });
        }
        res.status(201).json({ message: '✅ User created', userId: result.insertId });
    });
});


// Route: Get All Users
app.get('/getData', (req, res) => {
    const sql = 'SELECT * FROM test';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('❌ Select error:', err);
            return res.status(500).json({ error: 'Failed to fetch users' });
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
