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
    return await getStats().then(data => {
      return static.serve(req, res, data, "application/json");
    });

  } else if (path.pathname.startsWith("/api/questions/")) {
    // Question query
    const q = parseInt(path.filename);
    if (q > 4 || q < 1) {
      return static.serveError(res, "Question inconnue.", 400);
    }
    switch (q) {
      case 1:
        return await getQ1().then(data => {
          return static.serve(req, res, data, "application/json");
        });
      case 2:
        return await getQ2().then(data => {
          return static.serve(req, res, data, "application/json");
        });
      case 3:
        return await getQ3().then(data => {
          return static.serve(req, res, data, "application/json");
        });
      case 4:
        return await getQ4().then(data => {
          return static.serve(req, res, data, "application/json");
        });
    }

  } else {
    return static.serveError(res, "Requête inconnue.", 400);
  }
}

// Fetch search results
async function getSearchResults(query) {
  let q = "";
  if (query.advanced === "true") {
    let c = [];
    q = "SELECT * FROM Livres\n";
    if (query.titre) c.push(`titre ILIKE '%${query.titre}%'`);
    if (query.auteur) c.push(`auteur ILIKE '%${query.auteur}%'`);
    if (query.editeur) c.push(`editeur ILIKE '%${query.editeur}%'`);
    if (query.genre) c.push(`genre='${query.genre}'`);
    if (query.langue) c.push(`langue='${query.langue}'`);
    if (query.de && query.a) { c.push(`annee BETWEEN ${query.de} AND ${query.a}`); }
    else if (query.de) { c.push(`annee >= ${query.de}`); }
    else if (query.a) { c.push(`annee <= ${query.a}`); }
    if (c.length > 0) q += "WHERE ";
    q += c.join("\nAND ");
    q += "\nORDER BY titre";
  } else {
    q = `SELECT * FROM Livres
         WHERE titre ILIKE '%${query.q}%'
         OR auteur ILIKE '%${query.q}%'
         OR editeur ILIKE '%${query.q}%'
         ORDER BY titre`;
  }
  return await db.query(q);
}

// Fetch data for stats page
async function getStats() {
  const q1 = `SELECT count(*) as n FROM Livres`;
  const q2 = `SELECT count(*) as n FROM Adherents`;
  const q3 = `SELECT count(*) as n FROM Emprunts`;
  const q4 = `SELECT count(*) as n from Emprunts
              WHERE date_retour - date_emprunt > 14
              OR (date_retour=null) AND (CURRENT_DATE - date_emprunt > 14)`;
  return await Promise.all([db.query(q1), db.query(q2), db.query(q3), db.query(q4)]).then(data => {
    return {
      livres: data[0].rows[0].n,
      adherents: data[1].rows[0].n,
      emprunts: data[2].rows[0].n,
      retards: data[3].rows[0].n
    };
  });
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
  const q = `SELECT nom, AVG(duree)
             FROM adherents NATURAL JOIN (SELECT adherent_id, (date_retour - date_emprunt) AS duree FROM emprunts)
             GROUP BY nom`;
  return await db.query(q);
}

module.exports = { processRequest };
