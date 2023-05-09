# vue-hiking-tour-app-vue3

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Deployment auf Production Server (IONOS)
```
./deploy.sh
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Vue Technology Stack dieser App

Es kommen verschiedene Features, Plugins und Techniken zum Einsatz:
* Pinia (Pagination-States, Tourlist-States)
  * setup mit Option-API
* Axios (für AJAX-API ZUgriff auf Daten data.json)
* Vue Router
* Provide / Inject
* Watcher
* (Composbales): entfernt zugunsten von Pinia

## App im Detail

* [Flow-Chart der App mit allen Components]



## Vue Router 404 in Live-Umgebung and How-to-fix it

* Problem Live-Server-Deployment und Vue Router (Web History-Mode): "...without a proper server configuration, the users will get a 404 error if they access https://example.com/user/id directly in their browser."
* Deswegen muss beim Deploy auf Hosting Server (IONOS) in den Root eine .htaccess
mit folgendem Inhalt
```shell
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
* Details siehe [Stackoverflow Issue](https://stackoverflow.com/questions/48752650/deploying-vue-js-app-and-getting-404-error-in-routes)



# Github: Troubleshooting ssh / PubKey

* Trotz mit dem Account verknüpften Public-Key, gibt's ein Permission denied bei `git push origin master`

````shell
LMZVVI5-DEV0004:phase10 ri42vob$ git push origin main
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```` 
* Ursache: Offensichtlich wird der neue Key für Github nicht permanent beim ssh-agent gespeichert.
(hab noch nicht herausgefunden, wie er permanent gespeichert wird)
* Abhilfe: Public Key erneut beim Agent hinterlegen: Agent starten
````shell
LMZVVI5-DEV0004:phase10 ri42vob$ eval "$(ssh-agent -s)"
Agent pid 39335

LMZVVI5-DEV0004:phase10 ri42vob$ ssh-add ~/.ssh/id_ed25519_github
Identity added: /Users/ri42vob/.ssh/id_ed25519_github (steffenkube72@gmail.com)
````
* Try it again...
````
LMZVVI5-DEV0004:phase10 ri42vob$ git push origin main
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
````
