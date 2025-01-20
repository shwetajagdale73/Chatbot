const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');


const app = express();
const port = 3307;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Shwetaj@123', 
    database: 'chatbot_db1',
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Endpoint to get responses
app.post('/api/chat', (req, res) => {
    const { message } = req.body;

    // Example: Simple response based on a database query
    db.query('SELECT response FROM chatbot_responses WHERE query = ?', [message], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error occurred');
        }

        if (results.length > 0) {
            res.json({ response: results[0].response });
        } else {
            res.json({ response: 'Sorry, I do not understand that.' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
