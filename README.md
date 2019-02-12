# ESIR-TP4 : Tests unitaires et sécurité

Pour ce TP nous allons repartir de l'état final du TP4.
Nous allons lui ajouter des tests unitaires, un peu de sécurité et une optimisation pour supporter des montées en charges.

## Objectifs :
  - Mettre en place des tests unitaires sur les services REST
  - Comprendre quelques failles de sécurité commune et le moyen de les éviter
  - Optimiser notre serveur par l'utilisation d'un pattern de cache mémoire.
  
## Sujets abordés :
 - Express
 - REST / CRUD
 - Tests unitaires
 - Optimisation (pattern cache)
 - Sécurisation des applications web
 
## Lien utiles :

  - Outillage (npm, node, git, curl, postman, ab, etc.) : https://slides.com/stephmichel/deck-4#/
  - Express : Le cours sur les tests unitaires et de charges de Benoît. 
  - tests unitaires avec mocha et chai : https://mherman.org/blog/testing-node-js-with-mocha-and-chai/
  
## Modules node utilisés
  - express : https://www.npmjs.com/package/express
  - mocha : https://www.npmjs.com/package/mocha
  - chai : https://www.npmjs.com/package/chai
  - chai-http : https://www.npmjs.com/package/chai-http
  - helmet : https://www.npmjs.com/package/helmet
  
Pour le bon déroulement du TP et pour vous familiariser avec GIT, lorsque vous liser une ligne du genre (Tag: BLA-BLA-BLA), 
c'est qu'il est temps de commiter vos modifications afin de pouvoir revenir à ce niveau de code plus tard si besoin. 
Ceci vous permettra également de vous y retrouver lorsque le correctif vous sera fourni.
  
# Initialisation d'un projet

Repartir de l'état final du TP3.

(tag : TP4-ESIR-INIT)

# STEP 1 : Configuration et permier test unitaire

Nous allons installer les modules mocha et chai-http et réaliser le test unitaire d'un permier service REST.

Modifier le package.json afin d'y ajouter le script de lancement des tests avec mocha :

    "test": "mocha --watch"

Créer un répertoire test et à l'intérieur, créer un fichier de test unitaire de users-v1.js. On pourra par exemple l'appeler users-v1-test.js.

Chai-http prend en entrée une application web, dans notre cas l'application express (c'est à dire la variable app dans app.js).

Il va donc falloir faire un peu de refactoring afin de rendre accessible l'objet app de app.js (en en faisant un module).

Il faudra externaliser le app.listen() qui est pour le moment réalisé dans app.js dans un nouveau fichier (server.js par exemple) qui deviendra le nouveau point d'entrée de l'application. Ceci impliquera quelques mises à jours dans package.config pour s'assurer que le serveur fonctionne encore.

Après cette étape de refactoring vous aurez :
  - un fichier module app.js qui instancie un express, mais qui ne démarre pas le serveur (il n'appelle pas listen()).
  - un fichier server.js qui utilise le module app.js et qui lance le serveur sur un port spécifique.  

Vérifier que votre serveur fonctionne encore avec la commande : npm start

Il vous reste à modifier le fichier users-v1-test.js afin d'y importer les modules app.js, chai et chai-http.
Coder maintenant le test du service REST /v1/users :

    const chai = require('chai')
    const chaiHttp = require('chai-http')
    const {app} = require('../app')
    chai.use(chaiHttp)

    describe('Users tests', () => {
      it('should list ALL users on /v1/users GET', (done) => {
        // TODO
      })
    })

(tag : TP4-ESIR-STEP1)

# STEP 2 : Réaliser les autres tests unitaires

En autonomie, il s'agit de réaliser les tests unitaires de tous les autres service REST.

    it('should list a SINGLE user on /v1/users/<id> GET')
    it('should add a SINGLE user on /v1/users POST')
    it('should update a SINGLE user on /v1/users/<id> PATCH')
    it('should delete a SINGLE user on /v1/users/<id> DELETE')

Remarque : vos tests vous remontrons peut être des bugs, qu'il vous faudra bien évidemment corriger...

(tag : TP4-ESIR-STEP2)

# STEP 3 : Tester les failles de son server web avec OWASP ZAP (Zed Attack Project)

En autonomie, il s'agit de tester son application avec l'outil ZAP de la fondation OWASP.

Après cette analyse des failles, il s'agit de trouver les parades...

[Vous devriez obtenir quelque chose comme...](zap.PNG)

Aide : un bon casque fera l'affaire

(tag : TP4-ESIR-STEP3)
