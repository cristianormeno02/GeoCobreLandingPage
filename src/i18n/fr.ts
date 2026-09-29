import type { Dictionary } from './types';

// Borrador de traducción: pendiente de revisión técnica (tarea 6.3).
export const fr: Dictionary = {
  meta: {
    lang: 'fr',
    ogLocale: 'fr_FR',
    title: 'GeoCobre | Conseil géologique et exploration minière',
    description:
      "Conseil intégral en exploration minière fondé sur la recherche appliquée : description de carottes et échantillonnage sur le terrain, analyse macroscopique et microscopique des roches en laboratoire. Service TRL 5 validé à Morro del Cobre.",
  },
  skipLink: 'Aller au contenu',
  nav: {
    label: 'Navigation principale',
    home: 'Accueil',
    links: {
      methodology: 'Méthodologie',
      services: 'Services',
      validation: 'Validation',
      team: 'Équipe',
      training: 'Formation',
      alliances: 'Partenariats',
      contact: 'Contact',
    },
    cta: 'Demander un conseil',
    menuOpen: 'Ouvrir le menu',
    menuClose: 'Fermer le menu',
    languageLabel: 'Langue',
  },
  hero: {
    title: "Nous transformons l'incertitude géologique en décisions stratégiques",
    subtitle:
      "Conseil intégral en exploration minière fondé sur la recherche appliquée. Nous intervenons sur le terrain et en laboratoire pour interpréter vos gisements depuis leur origine, en réduisant les risques financiers et les impacts environnementaux.",
    ctaPrimary: 'Demander un conseil',
    ctaSecondary: 'Voir les services',
    badgeTrl: 'TRL 5',
    badgeTrlHint: 'Technologie validée en environnement pertinent',
    badgeValidated: 'Validé à Morro del Cobre',
  },
  methodology: {
    title: 'Une méthodologie fondée sur la recherche appliquée',
    intro:
      "Nous intégrons l'échantillonnage, l'analyse et l'interprétation des résultats à partir des aspects génétiques des gisements : comprendre comment un gisement s'est formé permet de mieux décider où et comment l'explorer.",
    steps: {
      sampling: {
        title: 'Échantillonnage',
        text: 'Conception et réalisation d’échantillonnages représentatifs sur le terrain, orientés vers les questions géologiques clés du projet.',
      },
      analysis: {
        title: 'Analyse',
        text: 'Étude macroscopique et microscopique des échantillons de roche pour caractériser la minéralogie, les textures et les altérations.',
      },
      interpretation: {
        title: 'Interprétation',
        text: 'Intégration des résultats dans un modèle génétique du gisement qui appuie les décisions d’exploration.',
      },
    },
    benefitsTitle: 'Avantages',
    benefits: {
      financial: {
        title: 'Réduction du risque financier',
        text: 'Des décisions d’exploration fondées qui évitent d’investir dans des cibles à faible probabilité de succès.',
      },
      environmental: {
        title: 'Réduction de l’impact environnemental',
        text: 'Une exploration plus ciblée, avec moins d’interventions inutiles sur le territoire.',
      },
    },
  },
  services: {
    title: 'Services',
    intro: 'Conseil spécialisé sur le terrain et en laboratoire pour les projets d’exploration minière.',
    fieldTitle: 'Terrain',
    labTitle: 'Laboratoire',
    cta: 'Se renseigner',
    items: {
      logging: {
        title: 'Description de carottes',
        text: 'Description géologique systématique des carottes et des cuttings de forage.',
      },
      sampling: {
        title: 'Échantillonnage',
        text: 'Planification et prélèvement d’échantillons représentatifs pour les analyses ultérieures.',
      },
      fieldAdvisory: {
        title: 'Conseil sur le terrain',
        text: 'Accompagnement technique des équipes d’exploration pendant les campagnes de terrain.',
      },
      macro: {
        title: 'Analyse macroscopique',
        text: 'Caractérisation des échantillons de roche à l’œil nu et à la loupe : lithologie, altération et minéralisation.',
      },
      micro: {
        title: 'Analyse microscopique',
        text: 'Étude des échantillons de roche au microscope pour identifier minéraux, textures et relations paragénétiques.',
      },
    },
    interpretation: {
      title: 'Interprétation intégrée des résultats',
      text: 'Nous réunissons les données de terrain et de laboratoire dans un rapport comportant des conclusions et des recommandations concrètes pour votre projet.',
    },
  },
  validation: {
    title: 'Validation et maturité technologique',
    intro:
      "Notre service a atteint le niveau de maturité technologique TRL 5 : la méthodologie a été validée dans un environnement pertinent d'exploration réelle.",
    caseLabel: 'Cas de validation',
    caseTitle: 'Projet Morro del Cobre',
    caseText:
      'La méthodologie de GeoCobre a été appliquée et validée sur le projet Morro del Cobre, en intégrant travail de terrain, analyses de laboratoire et interprétation génétique du gisement.',
    trlTitle: 'Échelle de maturité technologique (TRL)',
    trlLevel: 'Niveau',
    trlCurrent: 'Niveau actuel de GeoCobre',
    trlLevels: [
      'Principes de base observés',
      'Concept technologique formulé',
      'Preuve de concept expérimentale',
      'Technologie validée en laboratoire',
      'Technologie validée en environnement pertinent',
      'Technologie démontrée en environnement pertinent',
      'Prototype démontré en environnement opérationnel',
      'Système complet et qualifié',
      'Système éprouvé en environnement opérationnel',
    ],
  },
  team: {
    title: 'Équipe',
    intro: 'Des géologues expérimentés en exploration minière et en recherche appliquée.',
    photoAlt: 'Photo de',
    linkedinLabel: 'Profil LinkedIn de',
  },
  training: {
    title: 'Formation',
    intro: 'Des formations en géologie appliquée à l’exploration minière pour les professionnels, les étudiants et les institutions.',
    emptyTitle: 'Offre de formation en préparation',
    emptyText: 'Nous préparons nos premières formations. Écrivez-nous pour être informé ou demander une formation sur mesure.',
    modality: 'Modalité',
    cta: 'Demander des informations',
  },
  alliances: {
    title: 'Partenariats stratégiques',
    intro: 'Nous souhaitons bâtir un réseau de collaboration pour renforcer la recherche appliquée en exploration minière.',
    types: {
      labs: {
        title: 'Laboratoires',
        text: 'Nationaux et internationaux, pour compléter les capacités analytiques.',
      },
      government: {
        title: 'Organismes publics',
        text: 'Pour apporter des connaissances géologiques à la gestion publique du territoire.',
      },
      mining: {
        title: 'Sociétés minières',
        text: 'Pour appliquer notre méthodologie à des projets d’exploration.',
      },
      universities: {
        title: 'Universités',
        text: 'Pour stimuler la recherche conjointe et la formation des professionnels.',
      },
    },
    partnersTitle: 'Organisations partenaires',
    cta: 'Proposer un partenariat',
  },
  contact: {
    title: 'Contact',
    intro: 'Parlez-nous de votre projet et nous vous répondrons rapidement.',
    fields: {
      name: 'Nom complet',
      email: 'Adresse e-mail',
      company: 'Entreprise ou institution',
      country: 'Pays',
      type: 'Type de demande',
      message: 'Message',
      consent: 'J’accepte le traitement de mes données conformément à la',
      consentLink: 'politique de confidentialité',
    },
    optional: 'facultatif',
    typePlaceholder: 'Sélectionnez une option',
    typeOptions: {
      field: 'Services de terrain',
      lab: 'Analyses de laboratoire',
      training: 'Formation',
      alliance: 'Partenariat stratégique',
      other: 'Autre',
    },
    messagePlaceholder: 'Décrivez votre projet, sa localisation, le type de gisement et les délais.',
    submit: 'Envoyer la demande',
    sending: 'Envoi en cours…',
    success: 'Merci ! Nous avons bien reçu votre demande et vous répondrons bientôt.',
    error: 'Votre message n’a pas pu être envoyé. Réessayez ou contactez-nous directement :',
    errors: {
      required: 'Ce champ est obligatoire.',
      email: 'Saisissez une adresse e-mail valide.',
      messageMin: 'Le message doit contenir au moins 20 caractères.',
      consent: 'Vous devez accepter la politique de confidentialité.',
      type: 'Sélectionnez un type de demande.',
    },
    subject: 'Nouvelle demande depuis le site de GeoCobre',
  },
  whatsapp: {
    label: 'Écrivez-nous sur WhatsApp',
    message: 'Bonjour GeoCobre, je souhaiterais recevoir des informations sur vos services de conseil géologique.',
  },
  footer: {
    tagline: 'Conseil géologique et recherche appliquée à l’exploration minière.',
    sectionsTitle: 'Sections',
    contactTitle: 'Contact',
    privacy: 'Politique de confidentialité',
    rights: 'Tous droits réservés.',
  },
  privacy: {
    title: 'Politique de confidentialité',
    draftNotice: 'Brouillon en attente de révision juridique.',
    paragraphs: [
      'GeoCobre utilise les données transmises via le formulaire de contact (nom, e-mail, entreprise, pays et message) uniquement pour répondre à votre demande et assurer le suivi d’une éventuelle relation commerciale.',
      'Les messages sont transmis via le service Web3Forms, qui agit en tant que sous-traitant pour l’envoi. Nous ne vendons ni ne cédons vos données à des tiers à des fins commerciales.',
      'Vous pouvez demander l’accès, la rectification ou la suppression de vos données en écrivant à l’adresse indiquée ci-dessous.',
    ],
    contactLabel: 'Contact pour les questions de confidentialité :',
    back: 'Retour à l’accueil',
  },
  thanks: {
    title: 'Merci de nous avoir écrit !',
    text: 'Nous avons bien reçu votre demande et vous répondrons rapidement.',
    back: 'Retour à l’accueil',
  },
  notFound: {
    title: 'Page introuvable',
    text: 'La page que vous recherchez n’existe pas ou a été déplacée.',
    back: 'Retour à l’accueil',
  },
};
