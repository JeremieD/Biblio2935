# Biblio2935
Dans le cadre du cours IFT2935.

Cette application est constituée
 - d'un serveur Node.js, qui fournit l'interface client accessible via votre navigateur
 - et d'un serveur PostgreSQL qui contient la base de données.

Ces deux modules sont exécutés dans leur propre conteneur à l'aide de Docker Compose.

## Pour exécuter l’application
Pour exécuter ce projet, vous aurez besoin de Docker. Naviguez jusqu'à la racine
du projet et exécutez `docker compose up --build`

Si tout fonctionne, vous devriez pouvoir accéder au client à l'adresse `localhost:8200`.

Vous devriez aussi pouvoir accéder à la base de données directement à l'adresse `localhost:5432` (utilisateur, mot de passe et DB: `postgres`).

SVP contactez Jérémie pour tout problème à l'installation ou à l'exécution.

## Crédits et licence
Les données de livres proviennent du portail de données ouvertes de la Ville de Montréal.
