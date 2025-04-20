import { Category } from '../types';

export const categoryStructure: Category[] = [
  {
    name: 'Boutique',
    link: '/boutique',
    subcategories: []
  },
  {
    name: 'Billets/Événements',
    link: '/billets-evenements',
    subcategories: [
      { name: 'Concerts', link: '/billets-evenements?category=Concerts' },
      { name: 'Festivals', link: '/billets-evenements?category=Festivals' },
      { name: 'Théâtre', link: '/billets-evenements?category=Théâtre' },
      { name: 'Soirées privées', link: '/billets-evenements?category=Soirées privées' },
      { name: 'Sport', link: '/billets-evenements?category=Sport' }
    ]
  },
  {
    name: 'Mode et accessoire',
    link: '/boutique?category=mode-accessoire',
    subcategories: [
      { name: 'Vêtements & Chaussures', link: '/boutique?subcategory=vetements-chaussures' },
      { name: 'Accessoires', link: '/boutique?subcategory=accessoires' }
    ]
  },
  {
    name: 'Maison et Electroménager',
    link: '/boutique?category=maison-electromenager',
    subcategories: [
      { name: 'Meubles & Déco', link: '/boutique?subcategory=meubles-deco' },
      { name: 'Électroménager', link: '/boutique?subcategory=electromenager' },
      { name: 'Bricolage & Jardinage', link: '/boutique?subcategory=bricolage-jardinage' }
    ]
  },
  {
    name: 'HighTech',
    link: '/boutique?category=hightech',
    subcategories: [
      { name: 'Téléphones & Tablettes', link: '/boutique?subcategory=telephones-tablettes' },
      { name: 'Ordinateurs & Périphériques', link: '/boutique?subcategory=ordinateurs-peripheriques' },
      { name: 'Audiovisuel', link: '/boutique?subcategory=audiovisuel' },
      { name: 'Photographie & Vidéo', link: '/boutique?subcategory=photographie-video' },
      { name: 'Accessoires High-Tech', link: '/boutique?subcategory=accessoires-hightech' }
    ]
  },
  {
    name: 'Vehicule et immobilier',
    link: '/boutique?category=vehicule-immobilier',
    subcategories: [
      { name: 'Véhicules', link: '/boutique?subcategory=vehicules' },
      { name: 'Immobilier', link: '/boutique?subcategory=immobilier' }
    ]
  },
  {
    name: 'Enfant et education',
    link: '/boutique?category=enfant-education',
    subcategories: [
      { name: 'Bébés & Enfants', link: '/boutique?subcategory=bebes-enfants' },
      { name: 'Livres & Fournitures', link: '/boutique?subcategory=livres-fournitures' },
      { name: 'Matériel éducatif', link: '/boutique?subcategory=materiel-educatif' }
    ]
  },
  {
    name: 'Loisirs',
    link: '/boutique?category=loisirs',
    subcategories: [
      { name: 'Loisirs & Sport', link: '/boutique?subcategory=loisirs-sport' },
      { name: 'Emploi & Services', link: '/boutique?subcategory=emploi-services' },
      { name: 'Produits Pro & Artisanaux', link: '/boutique?subcategory=produits-pro-artisanaux' }
    ]
  },
  {
    name: 'Services',
    link: '/boutique?category=services',
    subcategories: []
  }
];
