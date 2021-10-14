run app  symfony : php -S localhost:8000 -t public/
creation de BDD: php console/bin  doctrine:database:create
commande pour generer un entity : php bin/console make:entity Customer   --type relation pour les champs clé etranger
commande pour generer le fichier sql   php bin/console make:migration
commande pour migrer la BDD : php bin/console  doctrine:migrations:migrate
