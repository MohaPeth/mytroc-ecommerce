import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, HelpCircle, ShoppingCart, CreditCard, Package, Tag, Settings } from "lucide-react";
import { User } from "@/components/ui/icon-user";
import Header from "@/components/Header";
type FAQItem = {
  question: string;
  answer: string;
  category: string;
};
const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const faqItems: FAQItem[] = [
  // Compte et Connexion
  {
    question: "Comment créer un compte ?",
    answer: "Pour créer un compte, cliquez sur 'Créer un compte' dans le menu en haut à droite du site. Remplissez le formulaire avec vos informations personnelles (nom, prénom, adresse email, mot de passe) et acceptez les conditions de confidentialité. Vous recevrez ensuite un email de confirmation pour activer votre compte.",
    category: "account"
  }, {
    question: "Que faire si j'ai oublié mon mot de passe ?",
    answer: "Si vous avez oublié votre mot de passe, cliquez sur 'Se connecter', puis sur le lien 'Mot de passe oublié ?' sous le formulaire de connexion. Entrez votre adresse email et vous recevrez un lien pour réinitialiser votre mot de passe.",
    category: "account"
  }, {
    question: "Puis-je me connecter avec mes comptes Google ou Facebook ?",
    answer: "Oui, vous pouvez vous connecter à MyTroc en utilisant vos comptes Google ou Facebook. Sur la page de connexion, cliquez sur le bouton correspondant à votre choix et suivez les instructions. Cette méthode est plus rapide et vous n'avez pas besoin de mémoriser un mot de passe supplémentaire.",
    category: "account"
  },
  // Commandes et Livraison
  {
    question: "Comment passer une commande ?",
    answer: "Pour passer une commande, parcourez notre catalogue et ajoutez les produits souhaités à votre panier. Ensuite, cliquez sur l'icône du panier en haut à droite de l'écran et suivez les étapes du processus de paiement : vérifiez votre commande, renseignez votre adresse de livraison, choisissez votre mode de livraison et procédez au paiement.",
    category: "orders"
  }, {
    question: "Quels sont les modes de livraison disponibles ?",
    answer: "Nous proposons plusieurs options de livraison : livraison standard (3-5 jours ouvrés), livraison express (1-2 jours ouvrés), et retrait en point relais. Les frais de livraison varient en fonction du poids de votre commande et de l'option choisie. Pour les commandes dépassant 50€, la livraison standard est offerte.",
    category: "orders"
  }, {
    question: "Que faire si ma commande est retardée ?",
    answer: "Si votre commande est retardée, vous pouvez vérifier son statut dans la section 'Mes commandes' de votre compte. Si le retard persiste au-delà de la date de livraison estimée, contactez notre service client par téléphone au 01 43 66 19 31 ou par email à support@mytroc.com. Nous vous fournirons des informations sur la situation et les mesures prises.",
    category: "orders"
  }, {
    question: "Comment suivre ma commande ?",
    answer: "Pour suivre votre commande, connectez-vous à votre compte et accédez à la section 'Mes commandes'. Vous y trouverez le statut actuel de votre commande et un numéro de suivi si elle a été expédiée. Vous pouvez également suivre votre colis directement sur le site du transporteur en utilisant ce numéro de suivi.",
    category: "orders"
  },
  // Paiement et Retours
  {
    question: "Quels modes de paiement sont acceptés ?",
    answer: "Nous acceptons plusieurs méthodes de paiement : cartes de crédit (Visa, Mastercard, American Express), PayPal, Apple Pay et les virements bancaires. Tous les paiements sont sécurisés et vos informations bancaires ne sont jamais stockées sur notre serveur.",
    category: "payment"
  }, {
    question: "Puis-je annuler ou modifier ma commande après l'avoir passée ?",
    answer: "Vous pouvez annuler ou modifier votre commande tant qu'elle n'a pas été expédiée. Pour ce faire, connectez-vous à votre compte, accédez à 'Mes commandes', sélectionnez la commande concernée et cliquez sur 'Annuler' ou 'Modifier'. Si la commande a déjà été expédiée, vous ne pourrez plus l'annuler, mais vous pourrez effectuer un retour une fois le colis reçu.",
    category: "payment"
  }, {
    question: "Quelle est votre politique de retour ?",
    answer: "Vous disposez de 14 jours à compter de la réception de votre commande pour retourner un article qui ne vous convient pas. Les articles doivent être retournés dans leur état d'origine, non utilisés et avec leur emballage d'origine. Certains produits, comme les denrées périssables ou les articles personnalisés, ne sont pas éligibles au retour. Pour initier un retour, connectez-vous à votre compte et suivez les instructions dans la section 'Mes commandes'.",
    category: "payment"
  }, {
    question: "Combien de temps faut-il pour être remboursé ?",
    answer: "Une fois que nous avons reçu et vérifié l'état des articles retournés, le remboursement est traité dans un délai de 3 à 5 jours ouvrés. Le temps nécessaire pour que le montant apparaisse sur votre compte dépend de votre banque ou de votre prestataire de paiement, mais cela prend généralement entre 5 et 10 jours ouvrés supplémentaires.",
    category: "payment"
  },
  // Produits et Promotions
  {
    question: "Comment bénéficier des promotions ?",
    answer: "Pour bénéficier des promotions, consultez régulièrement notre page 'Offres' ou inscrivez-vous à notre newsletter pour recevoir nos offres directement dans votre boîte mail. Vous pouvez également suivre nos comptes sur les réseaux sociaux où nous annonçons nos promotions. Pour appliquer une promotion, entrez le code promo dans le champ prévu à cet effet lors du processus de paiement.",
    category: "products"
  }, {
    question: "Que faire si un produit est en rupture de stock ?",
    answer: "Si un produit est en rupture de stock, vous pouvez cliquer sur le bouton 'M'avertir lorsque disponible' sur la page du produit pour recevoir une notification par email dès que l'article sera de nouveau disponible. Alternativement, vous pouvez contacter notre service client pour savoir quand le réapprovisionnement est prévu ou pour trouver un produit similaire.",
    category: "products"
  }, {
    question: "Les produits sont-ils garantis ?",
    answer: "Oui, tous nos produits bénéficient de la garantie légale de conformité de 2 ans pour les produits neufs et de 6 mois pour les produits reconditionnés. Certains produits peuvent également bénéficier d'une garantie commerciale supplémentaire offerte par le fabricant. Les détails sur la garantie sont disponibles sur la page de chaque produit.",
    category: "products"
  },
  // Assistance Technique
  {
    question: "Comment puis-je contacter le support client ?",
    answer: "Vous pouvez contacter notre support client de plusieurs façons : par téléphone au 01 43 66 19 31 (du lundi au vendredi, de 9h à 18h), par email à support@mytroc.com, ou via le formulaire de contact disponible sur notre site. Pour un traitement plus rapide de votre demande, veuillez inclure votre numéro de commande si votre question concerne une commande spécifique.",
    category: "support"
  }, {
    question: "Que faire si je rencontre un problème technique sur le site ?",
    answer: "Si vous rencontrez un problème technique sur notre site (erreur, page qui ne charge pas, problème lors du paiement, etc.), essayez d'abord de rafraîchir la page ou de vider le cache de votre navigateur. Si le problème persiste, contactez notre équipe technique à tech-support@mytroc.com en décrivant le problème rencontré, le navigateur que vous utilisez et, si possible, en joignant une capture d'écran.",
    category: "support"
  }, {
    question: "Y a-t-il des frais de livraison ?",
    answer: "Oui, des frais de livraison s'appliquent en fonction du poids de votre commande et de l'option de livraison choisie. La livraison standard est gratuite pour toute commande supérieure à 50€. Les frais exacts sont calculés et affichés lors du processus de paiement avant la confirmation de votre commande.",
    category: "support"
  }];

  // Filtrer les FAQs en fonction de la recherche
  const filteredFAQs = faqItems.filter(item => item.question.toLowerCase().includes(searchQuery.toLowerCase()) || item.answer.toLowerCase().includes(searchQuery.toLowerCase()));

  // Récupérer les FAQs par catégorie
  const getFilteredFAQsByCategory = (category: string) => {
    return searchQuery ? filteredFAQs.filter(item => item.category === category) : faqItems.filter(item => item.category === category);
  };
  return <>
      <Header />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <div className="inline-flex justify-center items-center p-3 bg-blue-50 rounded-full mb-4">
              <HelpCircle className="h-10 w-10 text-mytroc-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Foire Aux Questions</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trouvez rapidement des réponses à vos questions les plus fréquentes concernant nos produits, 
              commandes, livraisons et plus encore.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-subtle p-6 mb-10">
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input type="search" placeholder="Rechercher dans les questions fréquentes..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
            </div>

            <Tabs defaultValue="account">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
                <TabsTrigger value="account" className="flex flex-col gap-2 py-3 data-[state=active]:bg-blue-50">
                  <User className="h-5 w-5" />
                  <span className="text-xs">Compte</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex flex-col gap-2 py-3 data-[state=active]:bg-blue-50">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="text-xs">Commandes</span>
                </TabsTrigger>
                <TabsTrigger value="payment" className="flex flex-col gap-2 py-3 data-[state=active]:bg-blue-50">
                  <CreditCard className="h-5 w-5" />
                  <span className="text-xs">Paiement</span>
                </TabsTrigger>
                <TabsTrigger value="products" className="flex flex-col gap-2 py-3 data-[state=active]:bg-blue-50">
                  <Tag className="h-5 w-5" />
                  <span className="text-xs">Produits</span>
                </TabsTrigger>
                <TabsTrigger value="support" className="flex flex-col gap-2 py-3 data-[state=active]:bg-blue-50">
                  <Settings className="h-5 w-5" />
                  <span className="text-xs">Assistance</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="account">
                <Accordion type="single" collapsible className="w-full">
                  {getFilteredFAQsByCategory("account").map((item, index) => <AccordionItem value={`account-${index}`} key={`account-${index}`}>
                      <AccordionTrigger className="text-left text-slate-950">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>)}
                  {getFilteredFAQsByCategory("account").length === 0 && <p className="text-gray-500 text-center py-8">
                      Aucune question trouvée pour cette recherche.
                    </p>}
                </Accordion>
              </TabsContent>

              <TabsContent value="orders">
                <Accordion type="single" collapsible className="w-full">
                  {getFilteredFAQsByCategory("orders").map((item, index) => <AccordionItem value={`orders-${index}`} key={`orders-${index}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>)}
                  {getFilteredFAQsByCategory("orders").length === 0 && <p className="text-gray-500 text-center py-8">
                      Aucune question trouvée pour cette recherche.
                    </p>}
                </Accordion>
              </TabsContent>

              <TabsContent value="payment">
                <Accordion type="single" collapsible className="w-full">
                  {getFilteredFAQsByCategory("payment").map((item, index) => <AccordionItem value={`payment-${index}`} key={`payment-${index}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>)}
                  {getFilteredFAQsByCategory("payment").length === 0 && <p className="text-gray-500 text-center py-8">
                      Aucune question trouvée pour cette recherche.
                    </p>}
                </Accordion>
              </TabsContent>

              <TabsContent value="products">
                <Accordion type="single" collapsible className="w-full">
                  {getFilteredFAQsByCategory("products").map((item, index) => <AccordionItem value={`products-${index}`} key={`products-${index}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>)}
                  {getFilteredFAQsByCategory("products").length === 0 && <p className="text-gray-500 text-center py-8">
                      Aucune question trouvée pour cette recherche.
                    </p>}
                </Accordion>
              </TabsContent>

              <TabsContent value="support">
                <Accordion type="single" collapsible className="w-full">
                  {getFilteredFAQsByCategory("support").map((item, index) => <AccordionItem value={`support-${index}`} key={`support-${index}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>)}
                  {getFilteredFAQsByCategory("support").length === 0 && <p className="text-gray-500 text-center py-8">
                      Aucune question trouvée pour cette recherche.
                    </p>}
                </Accordion>
              </TabsContent>
            </Tabs>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Vous n'avez pas trouvé de réponse à votre question ?</h3>
            <p className="text-gray-700 mb-4">
              Notre équipe de support client est disponible pour vous aider.
            </p>
            <Button>
              Contacter le support
            </Button>
          </div>
        </div>
      </div>
    </>;
};
export default FAQ;