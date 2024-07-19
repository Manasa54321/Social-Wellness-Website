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

    let query = `
        CREATE TABLE user (
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

    // con.query(query, (err, result) => {
    //     if (err) throw err;
    //     console.log("users table created");
    // });

    let createVolunteersTableQuery = `
        CREATE TABLE volunteers (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            user_id INT(5),
            FOREIGN KEY (user_id) REFERENCES user(user_id)
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
            FOREIGN KEY (volunteer_id) REFERENCES volunteers(id)
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
            FOREIGN KEY (volunteer_id) REFERENCES volunteers(id)
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
            FOREIGN KEY (volunteer_id) REFERENCES volunteers(id)
        )
    `;
    con.query(createVolunteerPrefDaysTableQuery, (err, result) => {
        if (err) throw err;
        console.log("Volunteer Preferred Days table created");
    });
});
