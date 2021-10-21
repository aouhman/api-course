<?php

namespace App\Entity;


use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\InvoiceRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=InvoiceRepository::class)
 * @ApiResource(
 *     attributes={
 *     "pagination_enabled"=true,
 *     "pagination_items_per_pge"=20,
 *     "order":{"sentAt":"desc"}
 *     },
 *     normalizationContext={
 *      "groups" ={"invoices_read"}
 *     },
 *     itemOperations={"GET","PUT","DELETE",
 *     "increment"={"method"="post","path"="/invoices/{id}/increment",
 *                            "controller"="App\Controller\InvoiceIncrementationController",
 *                            "swagger_context"=   { "summary" ="increment invoice","description"="incrément le chrono de facture"}
 *                            }
 *     },
 *
 *     subresourceOperations={
 *      "api_customers_invoices_get_subresource"={
 *         "normalization_context"={"groups"={"invoices_subresource"}}
 *           }
 *     },
 *     denormalizationContext={"disable_type_enforcement"=true}
 *
 *     )
 */
class Invoice
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read","customers_read","invoices_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     * @Groups({"invoices_read","customers_read","invoices_subresource"})
     * @Assert\NotBlank(message="le montant de la facture est obligatoire")
     * @Assert\Type(type="numeric",message="le montant de la facture doit être un numerique")
     */
    private $amount;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"invoices_read","customers_read","invoices_subresource"})
     * @Assert\Type("\DateTimeInterface",message="la date doit être YYYY-MM-DD")
     * @Assert\NotBlank(message="la date d'envoi ne doit pas être vide")
     */
    private $sentAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"invoices_read","customers_read","invoices_subresource"})
     * @Assert\NotBlank(message="le status de la facture est obligatoire")
     * @Assert\Choice(choices={"SENT","PAID","CANCELLED"},message="Le status doit être SENT ,PAID ,CANCELLED")
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity=Customer::class, inversedBy="invoices")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"invoices_read"})
     * @Assert\NotBlank(message="Le client de la facture ne doit pas être vide")
     */
    private $customer;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read","customers_read","invoices_subresource"})
     * @Assert\NotBlank(message="Le chrono ne doit pas être vide")
     * @Assert\Type(type="integer",message="le chrono droit etre numerique")
     */
    private $chrono;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount($amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt($sentAt)
    {
        $this->sentAt =$sentAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono(int $chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }


}
