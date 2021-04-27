# Tp touiteur 

Une simple application web inspirée du réseau social twitter.
Projet réalisée dans un but didactique pendant ma formation bac +4.
Complété et remis à ma sauce.

## Environnement 
### Requirements

* Node 14.16.0 LTS 

### Installation

```bash
# Clone the repository
git clone https://github.com/LoicROY/touiteur.git
# Enter into the directory
cd touiteur/
# Install the dependencies
npm ci
```

### Configuration

- Dans le dossier "environnement" :

    (si vous êtes en phase de developpement)
    - renommer le fichier "environnement.js~" en "developpement.js"
    - modifier le fichier avec les bonnes informations

    (ATTENTION, si vous modifier ce fichier plus tard je vous conseille de recréer le fichier environnement.js~ avec vos modifications afin de conserver vos changements lors d'un git push)

    (si vous êtes en phase de production)
    - renommer le fichier "environnement.js~" en "production.js"
    - modifier le fichier avec les bonnes informations

Il est obligatoire d'avoir ces 2 fichiers si vous souhaitez lancer l'application en phase de developpement et en phase de production !

### Launch the application
En developpement : 
```bash
npm run start
```
En production : 
```bash
npm run start:prod
```