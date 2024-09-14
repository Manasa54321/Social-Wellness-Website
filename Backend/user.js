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
  const query = "INSERT INTO user (username, firstName, lastName, email, phNo, address, role, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  connection.query(query, [username, firstName, lastName, email, phNo, address, role, password], (err, results) => {
    if (err) {
      console.error('Error adding user:', err);
      return res.status(500).json({ error: 'Error adding user' });
    }
    res.status(201).json({ message: 'User added successfully' });
  });
});

// Route to get all volunteers
app.get('/volunteers', (req, res) => {
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

// Route to add a new volunteer
app.post('/volunteer', (req, res) => {
  const { skills, prefTasks, prefDays, user } = req.body;

  // Start a transaction
  connection.beginTransaction(err => {
    if (err) {
      console.error('Error starting transaction:', err);
      return res.status(500).json({ error: 'Error starting transaction' });
    }

    // Insert into volunteers table
    const volunteerQuery = 'INSERT INTO volunteers (user_id) VALUES (?)';
    connection.query(volunteerQuery, [user.user_id], (err, result) => {
      if (err) {
        return connection.rollback(() => {
          console.error('Error inserting into volunteers table:', err);
          res.status(500).json({ error: 'Error adding volunteer' });
        });
      }

      const volunteerId = result.insertId;

      // Insert into volunteer_skills table
      const skillQueries = skills.map(skill => {
        return new Promise((resolve, reject) => {
          connection.query(
            'INSERT INTO volunteer_skills (volunteer_id, skill) VALUES (?, ?)',
            [volunteerId, skill],
            (err, result) => {
              if (err) return reject(err);
              resolve(result);
            }
          );
        });
      });

      // Insert into volunteer_pref_tasks table
      const taskQueries = prefTasks.map(prefTask => {
        return new Promise((resolve, reject) => {
          connection.query(
            'INSERT INTO volunteer_pref_tasks (volunteer_id, pref_task) VALUES (?, ?)',
            [volunteerId, prefTask],
            (err, result) => {
              if (err) return reject(err);
              resolve(result);
            }
          );
        });
      });

      // Insert into volunteer_pref_days table
      const dayQueries = prefDays.map(prefDay => {
        return new Promise((resolve, reject) => {
          connection.query(
            'INSERT INTO volunteer_pref_days (volunteer_id, pref_day) VALUES (?, ?)',
            [volunteerId, prefDay],
            (err, result) => {
              if (err) return reject(err);
              resolve(result);
            }
          );
        });
      });

      // Wait for all queries to finish
      Promise.all([...skillQueries, ...taskQueries, ...dayQueries])
        .then(() => {
          connection.commit(err => {
            if (err) {
              return connection.rollback(() => {
                console.error('Error committing transaction:', err);
                res.status(500).json({ error: 'Error adding volunteer' });
              });
            }
            res.status(201).json({ message: 'Volunteer added successfully' });
          });
        })
        .catch(err => {
          connection.rollback(() => {
            console.error('Error in transaction:', err);
            res.status(500).json({ error: 'Error adding volunteer' });
          });
        });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
