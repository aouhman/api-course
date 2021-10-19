<?php

namespace App\Controller;

use App\Entity\Invoice;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

 class InvoiceIncrementationController  extends AbstractController{

    private $manager ;


    /**
     * @Route("/api/invoices/{id}/increment")
     * @param Invoice $data
     * @return void
     */
    public function __invoke(Invoice $data)
    {
        $this->manager =  $this->getDoctrine()->getManager();
        $data->setChrono($data->getChrono()+1);
        $this->manager->flush();
         return $data;
    }

}