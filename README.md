# Geo-Voice

## Lancement de l'application pour le développement

- Tout d'abord il faudra récupérer le fichier de configuration de firebase.
  Une fois récupéré il faudra insérer dans : 

  'drop_voice_back/app/config/config-firebase-admin.json'

  Si le dossier config n’existe pas faudra le créer


- Par la suite faudra créer le fichier .env :

  'drop_voice_back/app/.env'

  Votre fichier .env devra contenir (faudra remplacer avec les bon identifiants) :
  ```.env
  ### APP
  URL_FRONT=http://localhost:4000/
  DATABASE="mysql://<USER_SQL>:<PASSWORD_USER>@<SERVER_DATABASE>:3306/<NAME_DATABASE>"

  ENV='development'
  # ENV='production'

  ### DATABASE DOCKER
  # Pour le développement l’utilisateur root peut suffire
  MYSQL_ROOT_PASSWORD=<PASSWORD_ROOT>
  # MYSQL_USER=<NOM_UTILISATEUR_MY_SQL>
  # MYSQL_PASSWORD=<PASSWORD_UTILISATEUR_MY_SQL>
  MYSQL_DATABASE=<NAME_DATABASE>

  ### Firebase
  API_KEY=<VOTRE_API_KEY>
  AUTH_DOMAIN="<VOTRE_AUTH_DOMAIN>"
  DATABASE_URL="<VOTRE_DATABASE_URL>"
  PROJECT_ID="<VOTRE_PROJECT_ID>"
  STORAGE_BUCKET="<VOTRE_STORAGE_BUCKET>"
  MESSAGING_SENDER_ID="<VOTRE_MESSAGING_SENDER_ID>"
  APP_ID="<VOTRE_APP_ID>"

  ### DROPBOX
  DROPBOX_ACCESS_TOKEN="<VOTRE_DROPBOX_ACCESS_TOKEN>"
  APP_KEY_DROPBOX='<VOTRE_APP_KEY_DROPBOX>'
  APP_SECRET_DROPBOX='<VOTRE_APP_SECRET>'
  REFRESH_TOKEN_DROPBOX='<VOTRE_REFRESH_TOKEN>'

  ```

- Par la suite il faudra créer un dossier certificats dans :
  'drop_voice_back/certificats'
  Cela va permettre par la suite de lancer l'application en HTTPS.

  Il faut d'abord lancer l'application pour cela vous devez suivre la session <b>"Start le container"</b> et puis faudra rentrez dans le container. Suivre la session <b>"Rentrez dans la machine du docker pour effectuer des commandes</b>".

  Pour faire cela il faut juste commenté cette ligne dans drop_voice_back/DockerFile.dev 
  
   #CMD ["flask", "run", "--host", "0.0.0.0", "--port", "5000", "--cert", "/app/cert.pem", "--key", "/app/key.pem"]

   et décommettez celle-ci CMD ["tail", "-f", "/dev/null"]


  Je rappelle que pour rentrer dans le container il faut être au niveau de : 'drop_voice_back'

  Une fois dans le container executer cette commande vous devez remplacer<ADRESSE_IP> par une adresse IP valide exemple 192.168.0.1:
  ```bash
  mkcert -install
  mkcert -key-file key.pem -cert-file cert.pem localhost <ADRESSE_IP>
  cd /usr/local/share/ca-certificates
  
  # La commande cp va copier le certificat au du projet il faut vérifier son nom donc d'abord fait un  ls -la et remplacer si jamais le nom du fichier

  cp mkcert_development_CA_178928495699523639395873563568737777600.crt /app/
  ```
  Cela va créer les clés SSL pour que l application puisse tourner en HTTPS

  Après faudra aller sur le navigateur que vous utiliser pour développement :

    <b>Firefox</b> :
    - Ouvrez Firefox et accédez à "Préférences" ou "Options".
    - Dans le menu latéral, sélectionnez "Vie privée et sécurité".
    - Faites défiler jusqu'à la section "Certificats" et cliquez sur "Afficher les certificats".
    - Dans l'onglet "Autorités", cliquez sur "Importer".
    - Sélectionnez le fichier du certificat racine de l'autorité de certification locale que vous avez généré avec mkcert.
    - Suivez les instructions à l'écran pour importer le certificat.
    - Redémarrez Firefox.

  <b>Chrome</b> :
  - Ouvrez Chrome et accédez à "Paramètres" à partir du menu (trois points verticaux en haut à droite).
  - Développez la section "Avancé" (peut être sous "Avancé").
  - Sous "Confidentialité et sécurité", sélectionnez "Gérer les certificats".
  - Dans l'onglet "Autorités de certification racines", cliquez sur "Importer".
  - Sélectionnez le fichier du certificat racine de l'autorité de certification locale que vous avez généré avec mkcert.
  - Suivez les instructions à l'écran pour importer le certificat.
  - Redémarrez Chrome.

  Vous pouvez aussi ajouter le certificat sur vos téléphone.

  Une fois la commande exécuté arrêter les différents conteneur et relancer la commande qui se trouve <b>"Start le container"</b>. L'application normalement va être lancé en HTTPS pour la partie Back.

  Il faudra faire l'inverse dans le DockerFile.dev car il faut que le container se lance avec cette commande :
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "5000", "--cert", "/app/cert.pem", "--key", "/app/key.pem"]


## Commandes Docker Back
```bash
cd drop_voice_back
```
### Start le container
```bash
docker-compose up --build
```
### Stop le container
```bash
docker-compose down
```

### Build
```bash
docker build .
```
### Rentrez dans la machine du docker pour effectuer des commandes
```bash
docker exec -it python-geo-voice bash
```
#### Pour rentrez dans le container de la base de données (Mysql)
```bash
docker exec -it database-geo-voice bash
# pour faire des requête à la bdd (changer les params)
mysql -h "server-name" -u "root" "-pXXXXXXXX" "database-name"
```


## Commandes Front

Si vous voulez que l'application soit accessible depuis votre téléphone lors du développement
### Verifier l'adresse IP de votre ordinateur
#### Windows
```bash
ipconfig
```
#### Linux ou Mac
```bash
ifconfig
```
<li>
  Pour obtenir l'adresse IP IPv4, rendez-vous dans la section "Carte réseau sans fil Wi-Fi".
</li>

<li>
  Ensuite, insérez cette adresse IP dans le fichier .env du côté back. Remplacez "URL_FRONT" par l'adresse IP avec le port utilisé précédemment en local.
</li>

<li>
  N'oubliez pas de mettre à jour également cette adresse IP dans le fichier environment.development.ts, en gardent le même port utilisé précédemment en local.
</li>

Il faudra copier le dossier "certificats" qui se trouve dans la partie back car cela va permettre au server  HTTPS de fonctionner.

## Commandes Docker Front

```bash
cd drop_voice_front
```

```bash
docker-compose up --build
```
Cela va vous permettre de lancer le container de Angular et la lancer en https pas besoin de lancer la commande ng serve

### Start
```bash
cd drop_voice_front

ng serve --host 0.0.0.0 --ssl
```
Pour le lancer le serveur back revoir la partie Docker

## Mise en production de l'application

- Tout d'abord il faudra récupérer le fichier de configuration de firebase.
  Une fois récupéré il faudra insérer dans : 

  'drop_voice_back/app/config/config-firebase-admin.json'

  Si le dossier config n’existe pas faudra le créer


- Par la suite faudra créer le fichier .env :

  'drop_voice_back/app/.env'

  Votre fichier .env devra contenir (faudra remplacer avec les bon identifiants) :
  ```.env
  ### APP
  URL_FRONT=<URL_FRONT_DISPONIBLE_SUR_INTERNET>
  ENV='production'
  DATABASE="mysql://<USER_SQL>:<PASSWORD_USER>@<SERVER_DATABASE>:3306/<NAME_DATABASE>"

  ### DATABASE DOCKER
  # Pour le développement l’utilisateur root peut suffire
  # Pour le mode PROD veuillez remplacer avec un utilisateur SQL et un mdp sécurisé.

  MYSQL_ROOT_PASSWORD=<PASSWORD_ROOT>
  MYSQL_USER=<NOM_UTILISATEUR_MY_SQL>
  MYSQL_PASSWORD=<PASSWORD_UTILISATEUR_MY_SQL>
  MYSQL_DATABASE=<NAME_DATABASE>

  ### Firebase
  API_KEY=<VOTRE_API_KEY>
  AUTH_DOMAIN="<VOTRE_AUTH_DOMAIN>"
  DATABASE_URL="<VOTRE_DATABASE_URL>"
  PROJECT_ID="<VOTRE_PROJECT_ID>"
  STORAGE_BUCKET="<VOTRE_STORAGE_BUCKET>"
  MESSAGING_SENDER_ID="<VOTRE_MESSAGING_SENDER_ID>"
  APP_ID="<VOTRE_APP_ID>"

  ### DROPBOX
  DROPBOX_ACCESS_TOKEN="<VOTRE_DROPBOX_ACCESS_TOKEN>"
  APP_KEY_DROPBOX='<VOTRE_APP_KEY_DROPBOX>'
  APP_SECRET_DROPBOX='<VOTRE_APP_SECRET>'
  REFRESH_TOKEN_DROPBOX='<VOTRE_REFRESH_TOKEN>'

  ```

  Faudra modifier la configuration de Nginx. Le fichier se trouve dans 'drop_voice_front/nginx/nginx.conf. Récupérez les clé pour le SSL depuis votre hébergeur.

  ### Build de l'image Docker
  Pour build votre image vous pouvez utiliser cette commande depuis un terminal, il faut être sur le chemin suivant: 'drop_voice/'
  ```bash
  docker-compose -f docker-compose.prod.yml up -d --build
  ```