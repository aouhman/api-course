<?php
namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber
{
    public function updateJwtData(JWTCreatedEvent $event)
    {
          $user = $event->getUser();
        //1. Récupérer l'utilisateur (pour avoir son firstName et lastName
         $data =$event->getData();
         $data['firstName'] = $user->getFirstName();
         $data['lastName'] = $user->getlastName();
         $event->setData($data);
    }
}