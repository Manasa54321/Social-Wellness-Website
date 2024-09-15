var mysql = require('mysql2');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: '1234',
    database: 'ngo'
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected to mysql blog database");
    const createTableQuery = `
    CREATE TABLE events (
      eid BIGINT AUTO_INCREMENT PRIMARY KEY,
      date DATE,
      ename VARCHAR(255),
      task VARCHAR(255),
      time VARCHAR(255),
      venue VARCHAR(255)
    );
  `;

  con.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Error creating table:', err);
      return;
    }
    console.log('Table created or already exists:', results);
  });

    let query = `
        CREATE TABLE user  (
            user_id INT(5) AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(30),
            firstName VARCHAR(30),
            lastName VARCHAR(30),
            email VARCHAR(50),
            password VARCHAR(50),
            phNo BIGINT,
            address VARCHAR(100),
            role VARCHAR(20)
        )
    `;

    con.query(query, (err, result) => {
        if (err) throw err;
        console.log("users table created");
    });

    let createVolunteersTableQuery = `
        CREATE TABLE IF NOT EXISTS volunteers (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            user_id INT(5),
            FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
        )
    `;

    con.query(createVolunteersTableQuery, (err, result) => {
        if (err) throw err;
        console.log("Volunteers table created");
    });

    let createVolunteerSkillsTableQuery = `
        CREATE TABLE volunteer_skills (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            volunteer_id BIGINT,
            skill VARCHAR(50),
            FOREIGN KEY (volunteer_id) REFERENCES volunteers(id) ON DELETE CASCADE
        )
    `;
    con.query(createVolunteerSkillsTableQuery, (err, result) => {
        if (err) throw err;
        console.log("Volunteer Skills table created");
    });

    let createVolunteerPrefTasksTableQuery = `
        CREATE TABLE volunteer_pref_tasks (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            volunteer_id BIGINT,
            pref_task VARCHAR(50),
            FOREIGN KEY (volunteer_id) REFERENCES volunteers(id) ON DELETE CASCADE
        )
    `;
    con.query(createVolunteerPrefTasksTableQuery, (err, result) => {
        if (err) throw err;
        console.log("Volunteer Preferred Tasks table created");
    });

    let createVolunteerPrefDaysTableQuery = `
        CREATE TABLE volunteer_pref_days (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            volunteer_id BIGINT,
            pref_day VARCHAR(20),
            FOREIGN KEY (volunteer_id) REFERENCES volunteers(id) ON DELETE CASCADE
        )
    `;
    con.query(createVolunteerPrefDaysTableQuery, (err, result) => {
        if (err) throw err;
        console.log("Volunteer Preferred Days table created");
    });

    let createVolEventsTableQuery = `
        CREATE TABLE vol_events (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            v_id BIGINT,
            e_id BIGINT,
            FOREIGN KEY (v_id) REFERENCES volunteers(id) ON DELETE CASCADE,
            FOREIGN KEY (e_id) REFERENCES events(eid) ON DELETE CASCADE
        )
    `;

    con.query(createVolEventsTableQuery, (err, result) => {
        if (err) throw err;
        console.log("VolEvents table created");
    });

    const createBloodDonationTableQuery = `
        CREATE TABLE blood_donation (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            date DATE,
            day VARCHAR(255),
            time VARCHAR(255),
            venue VARCHAR(255)
        )
    `;

    con.query(createBloodDonationTableQuery, (err, result) => {
        if (err) throw err;
        console.log("blood_donation table created");
    });


    const createVaccineCampTableQuery = `
    CREATE TABLE vaccine_camp (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        vaccine VARCHAR(255),
        vdate DATE,
        vtime VARCHAR(255),
        vlocation VARCHAR(255)
    )
`;

    con.query(createVaccineCampTableQuery, (err, result) => {
        if (err) throw err;
        console.log("VaccineCamp table created");
    });









    // Create bloodCenter table
    let createBloodCenterTableQuery = `
    CREATE TABLE bloodCenter (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    u_name VARCHAR(255),
    location VARCHAR(255),
    timing VARCHAR(20),
    status VARCHAR(50)
)
`;

    // Create bloodGroups table
    let createBloodGroupsTableQuery = `
   CREATE TABLE bloodGroups (
    id BIGINT PRIMARY KEY,
    blood_group VARCHAR(10) NOT NULL
);
`;


    let insertBloodGroups = `
        INSERT INTO bloodGroups (id, blood_group) VALUES
(1, 'A+'),
(2, 'A-'),
(3, 'B+'),
(4, 'B-'),
(5, 'AB+'),
(6, 'AB-'),
(7, 'O+'),
(8, 'O-');
    `

    // Create a join table to establish many-to-many relationship
    let createBloodCenterBloodGroupTableQuery = `
    CREATE TABLE bloodCenterBloodGroup (
    bloodCenter_id BIGINT,
    bloodGroup_id BIGINT,
    FOREIGN KEY (bloodCenter_id) REFERENCES bloodCenter(id),
    FOREIGN KEY (bloodGroup_id) REFERENCES bloodGroups(id),
    PRIMARY KEY (bloodCenter_id, bloodGroup_id)
);
    `;

    // Execute the queries
    con.query(createBloodCenterTableQuery, (err, result) => {
        if (err) throw err;
        console.log("bloodCenter table created");
    });

    con.query(createBloodGroupsTableQuery, (err, result) => {
        if (err) throw err;
        console.log("bloodGroups table created");
    });

    con.query(createBloodCenterBloodGroupTableQuery, (err, result) => {
        if (err) throw err;
        console.log("bloodCenterBloodGroup table created");
    });

    con.query(insertBloodGroups, (err, result) => {
        if (err) throw err;
        console.log("Blood Groups table created");
    });



    con.query(createVolunteersTableQuery, (err, result) => {
        if (err) throw err;
        console.log("Volunteers table created");
    });

    const createDonationTableQuery = `
        CREATE TABLE IF NOT EXISTS Donate (
        id INT AUTO_INCREMENT PRIMARY KEY,
        amount DOUBLE NOT NULL,
        description VARCHAR(255),
        donationDate DATE NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE
        )
    `;

    con.query(createDonationTableQuery, (err, result) => {
        if (err) throw err;
        console.log("donation table created");
    });

});