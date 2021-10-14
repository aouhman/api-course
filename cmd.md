run app  symfony : php -S localhost:8000 -t public/
creation de BDD: php console/bin  doctrine:database:create
commande pour generer un entity : php bin/console make:entity Customer
commande pour migrer la BDD : php bin/console  doctrine:migrations:migrate
