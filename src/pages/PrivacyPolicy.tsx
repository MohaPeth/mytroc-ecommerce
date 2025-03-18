
import React from "react";
import { Link } from "react-router-dom";
import { Shield, ShieldCheck, FileLock, Key, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <div className="inline-flex justify-center items-center p-3 bg-green-50 rounded-full mb-4">
            <ShieldCheck className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Politique de Confidentialité</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nous nous engageons à protéger vos données personnelles et à être transparents sur la façon dont nous les utilisons.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-subtle p-8 mb-10">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="mr-2 h-5 w-5 text-mytroc-primary" />
                Introduction
              </h2>
              <p className="text-gray-700 mb-4">
                MyTroc s'engage à protéger la vie privée et les données personnelles de ses utilisateurs. 
                Cette politique de confidentialité explique comment nous recueillons, utilisons, partageons et protégeons vos informations 
                lorsque vous utilisez notre site web et nos services.
              </p>
              <p className="text-gray-700">
                En utilisant notre site web et nos services, vous acceptez les pratiques décrites dans cette politique. 
                Nous vous encourageons à la lire attentivement pour comprendre nos pratiques concernant vos données personnelles.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="mr-2 h-5 w-5 text-mytroc-primary" />
                Collecte des Données
              </h2>
              <p className="text-gray-700 mb-4">
                Nous collectons différents types d'informations lorsque vous utilisez notre site web et nos services, notamment :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <span className="font-medium">Informations personnelles</span> : Nom, prénom, adresse email, numéro de téléphone, 
                  adresse postale, informations de paiement et autres informations que vous nous fournissez lors de votre inscription 
                  ou de vos achats.
                </li>
                <li>
                  <span className="font-medium">Informations de compte</span> : Identifiants de connexion, historique des achats, 
                  préférences et paramètres.
                </li>
                <li>
                  <span className="font-medium">Informations d'utilisation</span> : Données sur la façon dont vous interagissez avec notre site, 
                  y compris les pages visitées, le temps passé sur ces pages, les produits consultés, etc.
                </li>
                <li>
                  <span className="font-medium">Informations techniques</span> : Adresse IP, type et version du navigateur, 
                  paramètres de fuseau horaire, types et versions de plug-in, système d'exploitation et plateforme.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileLock className="mr-2 h-5 w-5 text-mytroc-primary" />
                Utilisation des Données
              </h2>
              <p className="text-gray-700 mb-4">
                Nous utilisons vos données personnelles pour les finalités suivantes :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <span className="font-medium">Fournir nos services</span> : Traiter vos commandes, gérer votre compte, 
                  vous permettre d'accéder à nos services et fonctionnalités.
                </li>
                <li>
                  <span className="font-medium">Améliorer notre offre</span> : Analyser comment nos services sont utilisés afin de les améliorer 
                  et développer de nouvelles fonctionnalités.
                </li>
                <li>
                  <span className="font-medium">Personnaliser votre expérience</span> : Vous proposer du contenu, des produits 
                  et des offres adaptés à vos intérêts et préférences.
                </li>
                <li>
                  <span className="font-medium">Communications</span> : Vous envoyer des notifications concernant votre compte, 
                  vos commandes, ainsi que des informations marketing si vous avez consenti à en recevoir.
                </li>
                <li>
                  <span className="font-medium">Sécurité et prévention des fraudes</span> : Protéger nos utilisateurs et nos services 
                  contre les activités frauduleuses ou illégales.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Key className="mr-2 h-5 w-5 text-mytroc-primary" />
                Partage des Données
              </h2>
              <p className="text-gray-700 mb-4">
                Nous pouvons partager vos données personnelles avec les tiers suivants :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <span className="font-medium">Prestataires de services</span> : Entreprises qui nous aident à fournir nos services 
                  (traitement des paiements, logistique et livraison, service client, etc.).
                </li>
                <li>
                  <span className="font-medium">Partenaires commerciaux</span> : Avec votre consentement, nous pouvons partager certaines 
                  informations avec des partenaires commerciaux pour vous proposer des offres susceptibles de vous intéresser.
                </li>
                <li>
                  <span className="font-medium">Autorités légales</span> : Si nous sommes légalement tenus de le faire ou pour protéger nos droits, 
                  notre propriété ou notre sécurité, ou ceux de nos utilisateurs ou d'autres parties.
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                Nous ne vendons pas vos données personnelles à des tiers et nous ne partageons pas vos informations avec des tiers 
                à des fins de marketing sans votre consentement explicite.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="mr-2 h-5 w-5 text-mytroc-primary" />
                Cookies et Suivi
              </h2>
              <p className="text-gray-700 mb-4">
                Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience sur notre site, 
                analyser comment nos services sont utilisés et personnaliser notre contenu et nos publicités.
              </p>
              <p className="text-gray-700 mb-4">
                Les types de cookies que nous utilisons incluent :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <span className="font-medium">Cookies essentiels</span> : Nécessaires au fonctionnement de notre site.
                </li>
                <li>
                  <span className="font-medium">Cookies de performance</span> : Pour comprendre comment les visiteurs interagissent avec notre site.
                </li>
                <li>
                  <span className="font-medium">Cookies de fonctionnalité</span> : Pour mémoriser vos préférences et paramètres.
                </li>
                <li>
                  <span className="font-medium">Cookies de publicité</span> : Pour vous montrer des publicités pertinentes.
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                Vous pouvez gérer vos préférences en matière de cookies via les paramètres de votre navigateur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <ShieldCheck className="mr-2 h-5 w-5 text-mytroc-primary" />
                Droits des Utilisateurs
              </h2>
              <p className="text-gray-700 mb-4">
                Vous disposez de plusieurs droits concernant vos données personnelles :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <span className="font-medium">Droit d'accès</span> : Vous pouvez demander à accéder à vos données personnelles.
                </li>
                <li>
                  <span className="font-medium">Droit de rectification</span> : Vous pouvez demander la correction de vos données 
                  si elles sont inexactes ou incomplètes.
                </li>
                <li>
                  <span className="font-medium">Droit à l'effacement</span> : Vous pouvez demander la suppression de vos données 
                  sous certaines conditions.
                </li>
                <li>
                  <span className="font-medium">Droit à la limitation du traitement</span> : Vous pouvez demander de limiter 
                  l'utilisation de vos données dans certaines circonstances.
                </li>
                <li>
                  <span className="font-medium">Droit à la portabilité des données</span> : Vous pouvez demander à recevoir vos données 
                  dans un format structuré, couramment utilisé et lisible par machine.
                </li>
                <li>
                  <span className="font-medium">Droit d'opposition</span> : Vous pouvez vous opposer au traitement de vos données 
                  à des fins de marketing direct ou pour des raisons liées à votre situation particulière.
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                Pour exercer l'un de ces droits, veuillez nous contacter via les coordonnées indiquées ci-dessous.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Phone className="mr-2 h-5 w-5 text-mytroc-primary" />
                Contact
              </h2>
              <p className="text-gray-700 mb-4">
                Si vous avez des questions concernant cette politique de confidentialité ou si vous souhaitez exercer 
                vos droits concernant vos données personnelles, vous pouvez nous contacter :
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <span className="font-medium">Par email</span> : privacy@mytroc.com
                </li>
                <li>
                  <span className="font-medium">Par téléphone</span> : 01 43 66 19 31
                </li>
                <li>
                  <span className="font-medium">Par courrier</span> : MyTroc, 98 Boulevard de Ménilmontant 75020 PARIS
                </li>
              </ul>
            </section>
          </div>
        </div>

        <div className="text-center">
          <Link to="/">
            <Button variant="outline">
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
