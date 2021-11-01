run app  symfony : php -S localhost:8000 -t public/
new project symfony composer create-project symfony/website-skeleton exercice
creation de BDD: php bin/console  doctrine:database:create
commande pour generer un entity : php bin/console make:entity Customer   --type relation pour les champs clé etranger
commande pour generer le fichier sql   php bin/console make:migration
commande pour migrer la BDD : php bin/console  doctrine:migrations:migrate
commande pour telecharger le 2 modules faker et fixture dans la version dev : composer require orm-fixtures fzaninotto/faker --dev
commande pour inserer fake données  php bin/console doctrine:fixtures:load --no-interaction
commande pour creer new user: php bin/console make:entity User
commande pour installer le apiPlatform: composer require api  
commande pour installer le JWT : composer  require "lexik/jwt-authentication-bundle"
commande pour creer dossier de configuration  mkdir -p config/jwt
commande pour generer key jwt  php bin/console lexik:jwt:generate-keypair
commande pour vider le cache symfony  php bin/console cache:clear
commande pour installer webpack composer require encore

REACT Commande
npm install react-dom@16.8.6 pour installer Component pour gérer les route
npm install react-router@5.0.0 pour installer Component pour gérer les route 
npm install axios@0.18.0 pour installer axios
npm install  moment pour installer converter  de date 
npm install react-paginate --save pour installer la pagination 
npm install jwt-decode pour decoder le jwt token
npm install react-toastify pour installer un toaster pour afficher les notification 



