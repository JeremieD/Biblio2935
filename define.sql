/*
 * Script de création des tables.
 */

DROP TABLE IF EXISTS Emprunts, Livres, Adherents, Commandes;

CREATE TABLE Adherents (
  adherent_id serial PRIMARY KEY,
  nom VARCHAR(255),
  adresse VARCHAR(255)
);

CREATE TABLE Livres (
  isbn NUMERIC(13, 0) PRIMARY KEY,
  titre VARCHAR(255),
  auteur VARCHAR(255),
  editeur VARCHAR(255),
  annee SMALLINT,
  genre VARCHAR(255),
  langue CHAR(2)
);

CREATE TABLE Emprunts (
  emprunt_id serial PRIMARY KEY,
  adherent_id serial,
  isbn NUMERIC(13, 0) NOT NULL,
  date_emprunt DATE NOT NULL,
  date_retour DATE,
  FOREIGN KEY (adherent_id) REFERENCES Adherents(adherent_id),
  FOREIGN KEY (isbn) REFERENCES Livres(isbn)
);

CREATE TABLE Commandes (
  id serial PRIMARY KEY,
  adherent_id serial,
  isbn NUMERIC (13, 0) NOT NULL,
  statut VARCHAR(255) DEFAULT 'Initiée',
  date_creation DATE DEFAULT CURRENT_DATE NOT NULL,
  date_maj DATE,
  FOREIGN KEY (adherent_id) REFERENCES Adherents(adherent_id),
  FOREIGN KEY (isbn) REFERENCES Livres(isbn)
);
