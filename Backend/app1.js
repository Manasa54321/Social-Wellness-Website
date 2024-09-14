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

app.get('/user/role/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT role FROM user WHERE user_id=id', (err, results) => {
    if (err) {
      console.error('Error fetching user role:', err);
      res.status(500).json({ error: 'Error fetching user role' });
      return;
    }
    res.json(results);
  });
});

app.get('/getevents', (req, res) => {
  connection.query('SELECT * FROM events', (err, results) => {
    if (err) {
      console.error('Error fetching events:', err);
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
    const query = `INSERT INTO user (username, firstName, lastName, email, phNo, address, role, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  
    connection.query(query, [username, firstName, lastName, email, phNo, address, role, password], (err, results) => {
      if (err) {
        console.error('Error adding user:', err);
        return res.status(500).json({ error: 'Error adding user' });
      }
      res.status(201).json({ message: 'User added successfully' });
    });
  });

  app.put('/user/:id', (req, res) => {
    const { id } = req.params;
    const { username, firstName, lastName, email, phNo, address, role, password } = req.body;
  
    // Input validation
  
    const query = `UPDATE user SET username = ?, first_name = ?, last_name = ?, email = ?, ph_no = ?, address = ?, role = ?, password = ? WHERE user_id = ?`;
  
    connection.query(query, [username, firstName, lastName, email, phNo, address, role, password, id], (err, results) => {
      if (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({ error: 'Error updating user' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User updated successfully' });
    });
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
  
    connection.query('SELECT * FROM user WHERE user_id = ?', [id], (err, results) => {
      if (err) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ error: 'Error fetching user' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(results[0]);
    });
  });

  app.get('/getevent/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM events WHERE eid = ?';
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error fetching event:', err);
            res.status(500).send('Server error');
        } else {
            res.json(result[0]);
        }
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
          return res.status(500).json({ error: err.message });
      }
      res.json(results);
  });
});

app.get('/volunteers/:id', (req, res) => {
  const { vid } = req.params;
  connection.query('SELECT * FROM volunteers WHERE id=?',[vid], (err, results) => {
    if (err) {
      console.error('Error fetching volunteer:', err);
      res.status(500).json({ error: 'Error fetching volunteer' });
      return;
    }
    res.json(results);
  });
});

app.get('/volunteerdetails', (req, res) => {
  const query = `
    SELECT 
    v.id AS volunteerId, 
    v.user_id AS userId, 
    u.username, 
    u.firstName, 
    u.lastName, 
    u.email,
    GROUP_CONCAT(DISTINCT vs.skill ORDER BY vs.skill) AS skills,
    GROUP_CONCAT(DISTINCT vpd.pref_day ORDER BY vpd.pref_day) AS preferredDays,
    GROUP_CONCAT(DISTINCT vpt.pref_task ORDER BY vpt.pref_task) AS preferredTasks
FROM 
    volunteers v
JOIN 
    user u ON v.user_id = u.user_id
LEFT JOIN 
    volunteer_skills vs ON v.id = vs.volunteer_id
LEFT JOIN 
    volunteer_pref_days vpd ON v.id = vpd.volunteer_id
LEFT JOIN 
    volunteer_pref_tasks vpt ON v.id = vpt.volunteer_id
GROUP BY 
    v.id;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching volunteer details:', err);
      res.status(500).json({ error: 'Error fetching volunteer details' });
      return;
    }
    res.json(results);  // Send all results as a response
  });
});


app.get('/user/role', (req, res) => {
  const userId = req.query.userId;
  const query = 'SELECT role FROM user WHERE user_id = ?';
  connection.query(query, [userId], (err, result) => {
      if (err) {
          console.error('Error fetching user role:', err);
          res.status(500).send('Server error');
      } else if (result.length === 0) {
          res.status(404).send('User not found');
      } else {
          res.json(result[0].role);
      }
  });
});


app.put('/updateevent/:id', (req, res) => {
    const { id } = req.params;
    const { ename, date, time, venue, task } = req.body;
    const query = 'UPDATE events SET ename = ?, date = ?, time = ?, venue = ?, task = ? WHERE eid = ?';
    connection.query(query, [ename, date, time, venue, task, id], (err, result) => {
        if (err) {
            console.error('Error updating event:', err);
            res.status(500).send('Server error');
        } else {
            res.send('Event updated successfully');
        }
    });
});

  app.post('/addevent', (req, res) => {
    const { ename, date, time, venue, task } = req.body;
  
    // Input validation
    // if (!ename || !date || !time || !venue || !task) {
    //   return res.status(400).json({ error: 'All fields are required' });
    // }
  
    const query = `INSERT INTO events (ename, date, time, venue, task) VALUES (?, ?, ?, ?, ?)`;
  
    connection.query(query, [ename, date, time, venue, task], (err, results) => {
      if (err) {
        console.error('Error adding event:', err);
        return res.status(500).json({ error: 'Error adding event' });
      }
      res.status(201).json({ message: 'Event added successfully' });
    });
  });

  app.get('/getevent/:eid', (req, res) => {
    const eid = req.params.eid;
    
    const query = `SELECT * FROM events WHERE id = ?`;
    
    connection.query(query, [eid], (err, result) => {
        if (err) {
            console.error('Error fetching event:', err);
            return res.status(500).json({ error: 'Error fetching event' });
        }
        
        if (result.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        
        res.json(result[0]);
    });
});

app.post('/volevents', (req, res) => {
  const { v_id, e_id } = req.body;
  
  // Input validation
  if (!v_id || !e_id) {
      return res.status(400).json({ error: 'Volunteer ID and Event ID are required' });
  }

  const query = `INSERT INTO vol_events (v_id, e_id) VALUES (?, ?)`;

  connection.query(query, [v_id, e_id], (err, results) => {
      if (err) {
          console.error('Error adding volunteer event:', err);
          return res.status(500).json({ error: 'Error adding volunteer event' });
      }
      res.status(201).json({ message: 'Volunteer event added successfully' });
  });
});



  // app.post('/volunteer', async (req, res) => {
  //   const { skills, prefTasks, prefDays, user } = req.body;
  
  //   try {
  //     const con = await mysql.createConnection(connection);
  //     const [result] = await connection.query('INSERT INTO volunteers (user_id) VALUES (?)', [user.user_id]);
  //     const volunteerId = result.insertId;
  
  //     const skillQueries = skills.map(skill => (
  //       connection.query('INSERT INTO volunteer_skills (volunteer_id, skill) VALUES (?, ?)', [volunteerId, skill])
  //     ));
  
  //     const taskQueries = prefTasks.map(task => (
  //       connection.query('INSERT INTO volunteer_pref_tasks (volunteer_id, pref_task) VALUES (?, ?)', [volunteerId, task])
  //     ));
  
  //     const dayQueries = prefDays.map(day => (
  //       connection.query('INSERT INTO volunteer_pref_days (volunteer_id, pref_day) VALUES (?, ?)', [volunteerId, day])
  //     ));
  
  //     await Promise.all([...skillQueries, ...taskQueries, ...dayQueries]);
  //     await con.end();
  //     res.status(201).send('Volunteer added successfully');
  //   } catch (err) {
  //     res.status(500).send(err.message);
  //   }
  // });


  app.post('/volunteer', (req, res) => {
    const { skills, prefTasks, prefDays, user } = req.body;
  
    // Log the received user object for debugging
    console.log('Received user:', user);
  
    // Ensure user_id is defined and valid
    // if (!user || !user.user_id) {
    //   return res.status(400).json({ error: 'Invalid user data' });
    // }
  
    // Start a transaction
    connection.beginTransaction(err => {
      if (err) {
        console.error('Error starting transaction:', err);
        return res.status(500).json({ error: 'Error starting transaction' });
      }
  
      // Insert into volunteers table
      const volunteerQuery = 'INSERT INTO volunteers (user_id) VALUES (?)';
      connection.query(volunteerQuery, [user.id], (err, result) => {
        if (err) {
          console.error('Error inserting volunteer:', err);
          return connection.rollback(() => {
            res.status(500).json({ error: 'Error inserting volunteer' });
          });
        }
  
        const volunteerId = result.insertId;
  
        // Insert skills
        const skillQueries = skills.map(skill => (
          new Promise((resolve, reject) => {
            connection.query('INSERT INTO volunteer_skills (volunteer_id, skill) VALUES (?, ?)', [volunteerId, skill], (err, result) => {
              if (err) reject(err);
              else resolve(result);
            });
          })
        ));
  
        // Insert preferred tasks
        const taskQueries = prefTasks.map(task => (
          new Promise((resolve, reject) => {
            connection.query('INSERT INTO volunteer_pref_tasks (volunteer_id, pref_task) VALUES (?, ?)', [volunteerId, task], (err, result) => {
              if (err) reject(err);
              else resolve(result);
            });
          })
        ));
  
        // Insert preferred days
        const dayQueries = prefDays.map(day => (
          new Promise((resolve, reject) => {
            connection.query('INSERT INTO volunteer_pref_days (volunteer_id, pref_day) VALUES (?, ?)', [volunteerId, day], (err, result) => {
              if (err) reject(err);
              else resolve(result);
            });
          })
        ));
  
        // Execute all queries
        Promise.all([...skillQueries, ...taskQueries, ...dayQueries])
          .then(() => {
            // Commit transaction
            connection.commit(err => {
              if (err) {
                console.error('Error committing transaction:', err);
                return connection.rollback(() => {
                  res.status(500).json({ error: 'Error committing transaction' });
                });
              }
              res.status(201).json({ message: 'Volunteer added successfully' });
            });
          })
          .catch(err => {
            console.error('Error executing queries:', err);
            connection.rollback(() => {
              res.status(500).json({ error: 'Error executing queries' });
            });
          });
      });
    });
  });
  
  // Route to get all vaccine camps
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


  

  // app.post('/volunteer', (req, res) => {
  //   const { skills, prefTasks, prefDays, user } = req.body;
  
  //   connection.query('INSERT INTO volunteers (user_id) VALUES (?)', [user.id], (err, result) => {
  //     if (err) throw err;
  //     const volunteerId = result.insertId;
  
  //     const skillQueries = skills.map(skill => (
  //       connection.query('INSERT INTO volunteer_skills (volunteer_id, skill) VALUES (?, ?)', [volunteerId, skill])
  //     ));
  
  //     const taskQueries = prefTasks.map(task => (
  //       connection.query('INSERT INTO volunteer_pref_tasks (volunteer_id, pref_task) VALUES (?, ?)', [volunteerId, task])
  //     ));
  
  //     const dayQueries = prefDays.map(day => (
  //       connection.query('INSERT INTO volunteer_pref_days (volunteer_id, pref_day) VALUES (?, ?)', [volunteerId, day])
  //     ));
  
  //     Promise.all([...skillQueries, ...taskQueries, ...dayQueries])
  //       .then(() => res.status(201).send('Volunteer added successfully'))
  //       .catch(err => res.status(500).send(err.message));
  //   });
  // });
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
