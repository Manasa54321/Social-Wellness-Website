const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 8080;

// Middleware
app.use(express.json()); // for parsing application/json
app.use(cors()); // for handling CORS

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: '1234',
  database: 'ngo'
});

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
  console.log('Connected to the database');
});

// Route to get all users
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM user', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Error fetching users' });
      return;
    }
    res.json(results);
  });
});

// Route to add a new user
app.post('/add', (req, res) => {
    const { username, firstName, lastName, email, phNo, address, role, password } = req.body;
  
    // Input validation
    
  
    // Use the actual column names from the table
    const query = "INSERT INTO user (username, firstName, lastName, email, phNo, address, role, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  
    connection.query(query, [username, firstName, lastName, email, phNo, address, role, password], (err, results) => {
      if (err) {
        console.error('Error adding user:', err);
        return res.status(500).json({ error: 'Error adding user' });
      }
      res.status(201).json({ message: 'User added successfully' });
    });
  });


  app.get('/volunteers', (req, res) => {
    // Query to fetch all volunteers with their details
    const query = `
        SELECT v.id, v.user_id, u.username, u.firstName, u.lastName, u.email
        FROM volunteers v
        JOIN user u ON v.user_id = u.user_id
    `;
    
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching volunteers:', err);
        return res.status(500).json({ error: 'Error fetching volunteers' });
      }
      res.json(results);
    });
  });
  
// Start the server
app.listen(port, () => {
  console.log("Server running at http://localhost:${port}");
});