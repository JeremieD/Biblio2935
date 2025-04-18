const uri = require("../util/uri.js");
const static = require("../web/static.js");
const { Client } = require("pg");

const db = new Client({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "postgres"
});
db.connect();

//
async function processRequest(req, res) {
  const path = new uri.URIPath(req.url);
  if (path.pathname === "/api/search") {
    // Search query
    return await getSearchResults(path.parameters).then(data => {
      return static.serve(req, res, data, "application/json");
    });

  } else if (path.pathname === "/api/stats") {
    // Stats query
    return static.serve(req, res, getStats(), "application/json");

  } else if (path.pathname.startsWith("/api/questions/")) {
    // Question query
    const q = parseInt(path.filename);
    if (q > 4 || q < 1) {
      return static.serveError(res, "Question inconnue.", 400);
    }
    switch (q) {
      case 1:
        return static.serve(req, res, getQ1(), "application/json");
      case 2:
        return static.serve(req, res, getQ2(), "application/json");
      case 3:
        return await getQ3().then(data => {
          return static.serve(req, res, data, "application/json");
        });
      case 4:
        return static.serve(req, res, getQ4(), "application/json");
    }

  } else {
    return static.serveError(res, "Requête inconnue.", 400);
  }
}

// Fetch search results
async function getSearchResults(query) {
  const q = `SELECT * FROM Livres
             WHERE titre ILIKE '%${query.q}%'
             OR auteur ILIKE '%${query.q}%'
             OR editeur ILIKE '%${query.q}%'
             ORDER BY titre`;
  return await db.query(q);
}

// Fetch data for stats page
async function getStats() {
  return {};
}

// Fetch question 1 answer
async function getQ1() {
  return {};
}

// Fetch question 2 answer
async function getQ2() {
  return {};
}

// Fetch question 3 answer
async function getQ3() {
  const q = `SELECT titre, annee FROM livres
             WHERE auteur='Tesson, Sylvain'
             AND annee BETWEEN 2010 AND 2020`;
  return await db.query(q);
}

// Fetch question 4 answer
async function getQ4() {
  return {};
}

module.exports = { processRequest };
