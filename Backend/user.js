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






app.get('/vaccineCamp', (req, res) => {
  connection.query('SELECT * FROM vaccine_camp', (err, results) => {
    if (err) {
      console.error('Error fetching vaccine camps:', err);
      res.status(500).json({ error: 'Error fetching vaccine camps' });
      return;
    }
    res.json(results);
  });
});

// Get a vaccine camp by ID
app.get('/vaccineCamp/:id', (req, res) => {
const { id } = req.params;

const query = 'SELECT * FROM vaccine_camp WHERE id = ?';

connection.query(query, [id], (err, results) => {
    if (err) {
        console.error('Error fetching vaccine camp by ID:', err);
        return res.status(500).json({ error: 'Error fetching vaccine camp by ID' });
    }
    
    if (results.length === 0) {
        return res.status(404).json({ message: 'Vaccine camp not found' });
    }

    res.json(results[0]);
});
});


// Route to add a new vaccine camp
app.post('/vaccineCamp', (req, res) => {
  const { vaccine, vdate, vtime, vlocation } = req.body;

  // Input validation (optional)

  const query = `INSERT INTO vaccine_camp (vaccine, vdate, vtime, vlocation) VALUES (?, ?, ?, ?)`;

  connection.query(query, [vaccine, vdate, vtime, vlocation], (err, results) => {
    if (err) {
      console.error('Error adding vaccine camp:', err);
      return res.status(500).json({ error: 'Error adding vaccine camp' });
    }
    res.status(201).json({ message: 'Vaccine camp added successfully' });
  });
});

//   Route to update a vaccine camp
app.put('/vaccineCamp/:id', (req, res) => {
  const { id } = req.params;
  const { vaccine, vdate, vtime, vlocation } = req.body;

  const query = `UPDATE vaccine_camp SET vaccine = ?, vdate = ?, vtime = ?, vlocation = ? WHERE id = ?`;

  connection.query(query, [vaccine, vdate, vtime, vlocation, id], (err, results) => {
    if (err) {
      console.error('Error updating vaccine camp:', err);
      return res.status(500).json({ error: 'Error updating vaccine camp' });
    }
    res.json({ message: 'Vaccine camp updated successfully' });
  });
});

app.delete('/vaccineCamp/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM vaccine_camp WHERE id = ?`;
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting vaccine camp:', err);
      return res.status(500).json({ error: 'Error deleting vaccine camp' });
    }
    res.json({ message: 'Vaccine camp deleted successfully' });
  });
});




app.get('/bloodDonation', (req, res) => {
  connection.query('SELECT * FROM blood_donation', (err, results) => {
      if (err) {
        console.error('Error fetching blood donation camps:', err);
        res.status(500).json({ error: 'Error fetching blood donation camps' });
        return;
      }
      res.json(results);
    });
});


app.post('/bloodDonation', (req, res) => {
  const { date, time, day, venue } = req.body;

  const query = `INSERT INTO blood_donation (date, time, day, venue) VALUES (?, ?, ?, ?)`;

  connection.query(query, [date, time, day, venue], (err, results) => {
      if (err) {
          console.error('Error adding blood donation camp:', err);
          return res.status(500).json({ error: 'Error adding blood donation camp' });
      }
      res.status(201).json({ message: 'Blood donation camp added successfully' });
  });
});

// Update a blood donation camp
app.put('/bloodDonation/:id', (req, res) => {
  const { id } = req.params;
  const { date, time, day, venue } = req.body;

  const query = `UPDATE blood_donation SET date = ?, time = ?, day = ?, venue = ? WHERE id = ?`;

  connection.query(query, [date, time, day, venue, id], (err, results) => {
      if (err) {
          console.error('Error updating blood donation camp:', err);
          return res.status(500).json({ error: 'Error updating blood donation camp' });
      }
      res.json({ message: 'Blood donation camp updated successfully' });
  });
});

// Delete a blood donation camp
app.delete('/bloodDonation/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM blood_donation WHERE id = ?`;

  connection.query(query, [id], (err, results) => {
      if (err) {
          console.error('Error deleting blood donation camp:', err);
          return res.status(500).json({ error: 'Error deleting blood donation camp' });
      }
      res.json({ message: 'Blood donation camp deleted successfully' });
  });
});

app.get('/bloodDonation/:id', (req, res) => {
const { id } = req.params;

const query = 'SELECT * FROM blood_donation WHERE id = ?';

connection.query(query, [id], (err, results) => {
    if (err) {
        console.error('Error fetching Blood Donation Camp by ID:', err);
        return res.status(500).json({ error: 'Error fetching vaccine camp by ID' });
    }

    if (results.length === 0) {
        return res.status(404).json({ message: 'Blood Donation camp not found' });
    }

    res.json(results[0]);
});
});








app.post('/bloodCenter', (req, res) => {
  const { u_name, location, timing, status, blood_groups } = req.body;

  // Ensure blood_groups is defined and is an array
  const bloodGroups = Array.isArray(blood_groups) ? blood_groups : [];

  const query = `INSERT INTO bloodCenter (u_name, location, timing, status) VALUES (?, ?, ?, ?)`;

  connection.query(query, [u_name, location, timing, status], (err, result) => {
    if (err) {
      console.error('Error adding blood center:', err);
      return res.status(500).json({ error: 'Error adding blood center' });
    }

    const bloodCenterId = result.insertId;

    // Link the blood groups (use the fixed blood group IDs)
    const bloodGroupMapping = {
      'A+': 1,
      'A-': 2,
      'B+': 3,
      'B-': 4,
      'AB+': 5,
      'AB-': 6,
      'O+': 7,
      'O-': 8
    };

    const bloodGroupIds = bloodGroups.map(group => bloodGroupMapping[group]).filter(id => id != null);

    if (bloodGroupIds.length > 0) {
      const insertBloodGroupPromises = bloodGroupIds.map(groupId => {
        return new Promise((resolve, reject) => {
          const insertQuery = `
            INSERT INTO bloodCenterBloodGroup (bloodCenter_id, bloodGroup_id)
            VALUES (?, ?)
          `;
          connection.query(insertQuery, [bloodCenterId, groupId], (err) => {
            if (err) {
              console.error('Error linking blood group:', err);
              reject(err);
            } else {
              resolve();
            }
          });
        });
      });

      Promise.all(insertBloodGroupPromises)
        .then(() => {
          res.status(201).json({ message: 'Blood center added successfully' });
        })
        .catch(err => {
          res.status(500).json({ error: 'Error linking blood groups to blood center' });
        });
    } else {
      res.status(201).json({ message: 'Blood center added successfully, but no valid blood groups provided' });
    }
  });
});



// Update a blood center
app.put('/bloodCenter/:id', (req, res) => {
  const { id } = req.params;
  const { u_name, location, timing, status, blood_groups } = req.body;

  const updateQuery = `
    UPDATE bloodCenter SET u_name = ?, location = ?, timing = ?, status = ? WHERE id = ?
  `;

  connection.query(updateQuery, [u_name, location, timing, status, id], (err) => {
    if (err) {
      console.error('Error updating blood center:', err);
      return res.status(500).json({ error: 'Error updating blood center' });
    }

    // Delete previous blood group associations
    const deleteBloodGroupsQuery = `DELETE FROM bloodCenterBloodGroup WHERE bloodCenter_id = ?`;

    connection.query(deleteBloodGroupsQuery, [id], (err) => {
      if (err) {
        console.error('Error removing old blood groups:', err);
        return res.status(500).json({ error: 'Error removing old blood groups' });
      }

      // Insert new blood group associations (use fixed blood group IDs)
      const bloodGroups = Array.isArray(blood_groups) ? blood_groups : [];

      const bloodGroupMapping = {
        'A+': 1,
        'A-': 2,
        'B+': 3,
        'B-': 4,
        'AB+': 5,
        'AB-': 6,
        'O+': 7,
        'O-': 8
      };

      const bloodGroupIds = bloodGroups.map(group => bloodGroupMapping[group]).filter(id => id != null);

      if (bloodGroupIds.length > 0) {
        const insertBloodGroupPromises = bloodGroupIds.map(groupId => {
          return new Promise((resolve, reject) => {
            const insertQuery = `
              INSERT INTO bloodCenterBloodGroup (bloodCenter_id, bloodGroup_id)
              VALUES (?, ?)
            `;
            connection.query(insertQuery, [id, groupId], (err) => {
              if (err) {
                console.error('Error updating blood group:', err);
                reject(err);
              } else {
                resolve();
              }
            });
          });
        });

        Promise.all(insertBloodGroupPromises)
          .then(() => {
            res.json({ message: 'Blood center updated successfully' });
          })
          .catch(err => {
            res.status(500).json({ error: 'Error updating blood groups' });
          });
      } else {
        res.json({ message: 'Blood center updated successfully, but no valid blood groups provided' });
      }
    });
  });
});



app.delete('/bloodCenter/:id', (req, res) => {
  const bloodCenterId = req.params.id;

  // Start a transaction
  connection.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to start transaction' });
    }

    // Delete associated records from bloodCenterBloodGroup
    const deleteBloodCenterBloodGroupQuery = 'DELETE FROM bloodCenterBloodGroup WHERE bloodCenter_id = ?';
    connection.query(deleteBloodCenterBloodGroupQuery, [bloodCenterId], (err) => {
      if (err) {
        return connection.rollback(() => {
          res.status(500).json({ error: 'Error deleting blood center blood group associations' });
        });
      }

      // Delete the blood center record
      const deleteBloodCenterQuery = 'DELETE FROM bloodCenter WHERE id = ?';
      connection.query(deleteBloodCenterQuery, [bloodCenterId], (err, result) => {
        if (err) {
          return connection.rollback(() => {
            res.status(500).json({ error: 'Error deleting blood center' });
          });
        }

        if (result.affectedRows === 0) {
          return connection.rollback(() => {
            res.status(404).json({ error: 'Blood center not found' });
          });
        }

        // Commit the transaction
        connection.commit((err) => {
          if (err) {
            return connection.rollback(() => {
              res.status(500).json({ error: 'Failed to commit transaction' });
            });
          }
          res.json({ message: 'Blood center deleted successfully' });
        });
      });
    });
  });
});








// Get all blood centers with blood groups
app.get('/bloodCenter', (req, res) => {
  const query = `
    SELECT bc.id, bc.u_name, bc.location, bc.timing, bc.status, 
           GROUP_CONCAT(bg.blood_group) AS blood_groups
    FROM bloodCenter bc
    LEFT JOIN bloodCenterBloodGroup bcbg ON bc.id = bcbg.bloodCenter_id
    LEFT JOIN bloodGroups bg ON bcbg.bloodGroup_id = bg.id
    GROUP BY bc.id
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching blood centers:', err);
      return res.status(500).json({ error: 'Error fetching blood centers' });
    }
    res.json(results);
  });
});


app.get('/bloodCenter/:id', (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT bc.id, bc.u_name, bc.location, bc.timing, bc.status, 
           GROUP_CONCAT(bg.blood_group) AS blood_groups
    FROM bloodCenter bc
    LEFT JOIN bloodCenterBloodGroup bcbg ON bc.id = bcbg.bloodCenter_id
    LEFT JOIN bloodGroups bg ON bcbg.bloodGroup_id = bg.id
    WHERE bc.id = ?
    GROUP BY bc.id
  `;

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching blood center by ID:', err);
      return res.status(500).json({ error: 'Error fetching blood center by ID' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Blood center not found' });
    }

    res.json(results[0]);
  });
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
