/*
 * Script de création des tables.
 */

DROP TABLE IF EXISTS Emprunts, Livres, Adherents;

CREATE TABLE Adherents (
  adherent_id serial PRIMARY KEY,
  nom varchar(255),
  adresse varchar(255)
);

CREATE TABLE Livres (
  isbn numeric(13, 0) PRIMARY KEY,
  titre varchar(255),
  auteur varchar(255),
  editeur varchar(255),
  annee smallint,
  genre varchar(255),
  langue char(2)
);

CREATE TABLE Emprunts (
  emprunt_id serial PRIMARY KEY,
  adherent_id serial,
  isbn numeric(13, 0) NOT NULL,
  date_emprunt date NOT NULL,
  date_retour date,
  FOREIGN KEY (adherent_id) REFERENCES Adherents(adherent_id),
  FOREIGN KEY (isbn) REFERENCES Livres(isbn)
);
