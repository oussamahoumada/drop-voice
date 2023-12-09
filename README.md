# Geo-Voice

## Commandes Docker
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


### Start
```bash
cd drop_voice_front

ng serve --host 0.0.0.0 --ssl
```
Pour le lancer le serveur back revoir la partie Docker