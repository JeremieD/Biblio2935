const fs = require("fs");
const { Client } = require("pg");

// Init databases.
// WARNING: OVERWRITES EVERYTHING

console.log("Initialisation de la base de données.");

const db = new Client({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "postgres"
});
db.connect();

// Create tables
const defineSQL = fs.readFileSync("./define.sql", "utf8");
const q1 = db.query(defineSQL);

// Add data
const populateSQL = fs.readFileSync("./populate.sql", "utf8");
const q2 = db.query(populateSQL);

return Promise.all([q1, q2]).then(() => {
  db.end();
});
