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
