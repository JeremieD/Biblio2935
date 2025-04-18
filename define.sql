/*
 * Script de création des tables.
 */

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

CREATE TABLE Exemplaires (
  isbn numeric(13, 0),
  numero smallserial,
  PRIMARY KEY (isbn, numero),
  FOREIGN KEY (isbn) REFERENCES Livres(isbn)
);

CREATE TABLE Emprunts (
  emprunt_id serial PRIMARY KEY,
  adherent_id serial,
  isbn numeric(13, 0) NOT NULL,
  numero smallserial,
  date_emprunt date NOT NULL,
  date_retour date,
  FOREIGN KEY (adherent_id) REFERENCES Adherents(adherent_id),
  FOREIGN KEY (ISBN, Numero) REFERENCES Exemplaires(isbn, numero)
);

CREATE TABLE Commandes (
  commande_id serial PRIMARY KEY,
  adherent_id serial,
  isbn numeric(13, 0) NOT NULL,
  statut varchar(16) NOT NULL default 'Demandé',
  FOREIGN KEY (adherent_id) REFERENCES Adherents(adherent_id),
  FOREIGN KEY (isbn) REFERENCES Livres(isbn)
);
