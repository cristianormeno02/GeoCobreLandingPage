import type { Dictionary } from './types';

// Borrador de traducción: pendiente de revisión técnica (tarea 6.3).
export const en: Dictionary = {
  meta: {
    lang: 'en',
    ogLocale: 'en_US',
    title: 'GeoCobre | Geological consulting and mineral exploration',
    description:
      'Comprehensive mineral exploration consulting based on applied research: drill core logging and sampling in the field, macroscopic and microscopic rock analysis in the lab. TRL 5 service validated at Morro del Cobre.',
  },
  skipLink: 'Skip to content',
  nav: {
    label: 'Main navigation',
    home: 'Home',
    links: {
      methodology: 'Methodology',
      services: 'Services',
      validation: 'Validation',
      team: 'Team',
      training: 'Training',
      alliances: 'Partnerships',
      contact: 'Contact',
    },
    cta: 'Request consulting',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    languageLabel: 'Language',
  },
  hero: {
    title: 'We turn geological uncertainty into strategic decisions',
    subtitle:
      'Comprehensive mineral exploration consulting based on applied research. We work in the field and in the lab to interpret your deposits from their origin, reducing financial risk and environmental impact.',
    ctaPrimary: 'Request consulting',
    ctaSecondary: 'View services',
    badgeTrl: 'TRL 5',
    badgeTrlHint: 'Technology validated in a relevant environment',
    badgeValidated: 'Validated at Morro del Cobre',
  },
  methodology: {
    title: 'A methodology grounded in applied research',
    intro:
      'We integrate sampling, analysis and interpretation of results based on the genetic aspects of ore deposits: understanding how a deposit formed leads to better decisions on where and how to explore it.',
    steps: {
      sampling: {
        title: 'Sampling',
        text: 'Design and execution of representative field sampling focused on the key geological questions of the project.',
      },
      analysis: {
        title: 'Analysis',
        text: 'Macroscopic and microscopic study of rock samples to characterize mineralogy, textures and alteration.',
      },
      interpretation: {
        title: 'Interpretation',
        text: 'Integration of results into a genetic model of the deposit that supports exploration decisions.',
      },
    },
    benefitsTitle: 'Benefits',
    benefits: {
      financial: {
        title: 'Lower financial risk',
        text: 'Well-founded exploration decisions that avoid investing in low-probability targets.',
      },
      environmental: {
        title: 'Lower environmental impact',
        text: 'More focused exploration, with fewer unnecessary interventions on the land.',
      },
    },
  },
  services: {
    title: 'Services',
    intro: 'Specialized field and laboratory consulting for mineral exploration projects.',
    fieldTitle: 'Field',
    labTitle: 'Laboratory',
    cta: 'Inquire',
    items: {
      logging: {
        title: 'Drill core logging',
        text: 'Systematic geological description of drill core and cuttings.',
      },
      sampling: {
        title: 'Sampling',
        text: 'Planning and collection of representative samples for subsequent analysis.',
      },
      fieldAdvisory: {
        title: 'On-site advisory',
        text: 'Technical support for exploration teams during field campaigns.',
      },
      macro: {
        title: 'Macroscopic analysis',
        text: 'Hand-specimen and hand-lens characterization of rock samples: lithology, alteration and mineralization.',
      },
      micro: {
        title: 'Microscopic analysis',
        text: 'Microscope study of rock samples to identify minerals, textures and paragenetic relationships.',
      },
    },
    interpretation: {
      title: 'Integrated interpretation of results',
      text: 'We combine field and laboratory data into a report with actionable conclusions and recommendations for your project.',
    },
  },
  validation: {
    title: 'Validation and technology readiness',
    intro:
      'Our service has reached Technology Readiness Level 5: the methodology has been validated in a relevant, real-world exploration environment.',
    caseLabel: 'Validation case',
    caseTitle: 'Morro del Cobre project',
    caseText:
      "GeoCobre's methodology was applied and validated at the Morro del Cobre project, integrating fieldwork, laboratory analysis and genetic interpretation of the deposit.",
    trlTitle: 'Technology Readiness Level (TRL) scale',
    trlLevel: 'Level',
    trlCurrent: "GeoCobre's current level",
    trlLevels: [
      'Basic principles observed',
      'Technology concept formulated',
      'Experimental proof of concept',
      'Technology validated in lab',
      'Technology validated in relevant environment',
      'Technology demonstrated in relevant environment',
      'Prototype demonstrated in operational environment',
      'System complete and qualified',
      'System proven in operational environment',
    ],
  },
  team: {
    title: 'Team',
    intro: 'Geology professionals with experience in mineral exploration and applied research.',
    photoAlt: 'Photo of',
    linkedinLabel: 'LinkedIn profile of',
  },
  training: {
    title: 'Training',
    intro: 'Training courses in geology applied to mineral exploration for professionals, students and institutions.',
    emptyTitle: 'Training program in development',
    emptyText: 'We are preparing our first courses. Contact us for information or to request tailored training.',
    modality: 'Format',
    cta: 'Request information',
  },
  alliances: {
    title: 'Strategic partnerships',
    intro: 'We aim to build a collaboration network that strengthens applied research in mineral exploration.',
    types: {
      labs: {
        title: 'Laboratories',
        text: 'National and international, to complement analytical capabilities.',
      },
      government: {
        title: 'Government agencies',
        text: 'To contribute geological knowledge to public land management.',
      },
      mining: {
        title: 'Mining companies',
        text: 'To apply our methodology to exploration projects.',
      },
      universities: {
        title: 'Universities',
        text: 'To drive joint research and professional training.',
      },
    },
    partnersTitle: 'Partner organizations',
    cta: 'Propose a partnership',
  },
  contact: {
    title: 'Contact',
    intro: 'Tell us about your project and we will get back to you shortly.',
    fields: {
      name: 'Full name',
      email: 'Email',
      company: 'Company or institution',
      country: 'Country',
      type: 'Inquiry type',
      message: 'Message',
      consent: 'I agree to the processing of my data under the',
      consentLink: 'privacy notice',
    },
    optional: 'optional',
    typePlaceholder: 'Select an option',
    typeOptions: {
      field: 'Field services',
      lab: 'Laboratory analysis',
      training: 'Training',
      alliance: 'Strategic partnership',
      other: 'Other',
    },
    messagePlaceholder: 'Describe your project, location, deposit type and timeline.',
    submit: 'Send inquiry',
    sending: 'Sending…',
    success: 'Thank you! We received your inquiry and will reply soon.',
    error: 'We could not send your message. Please try again or contact us directly:',
    errors: {
      required: 'This field is required.',
      email: 'Enter a valid email address.',
      messageMin: 'The message must be at least 20 characters long.',
      consent: 'You must accept the privacy notice.',
      type: 'Select an inquiry type.',
    },
    subject: 'New inquiry from the GeoCobre website',
  },
  whatsapp: {
    label: 'Message us on WhatsApp',
    message: 'Hello GeoCobre, I would like to receive information about your geological consulting services.',
  },
  footer: {
    tagline: 'Geological consulting and applied research for mineral exploration.',
    sectionsTitle: 'Sections',
    contactTitle: 'Contact',
    privacy: 'Privacy notice',
    rights: 'All rights reserved.',
  },
  privacy: {
    title: 'Privacy notice',
    draftNotice: 'Draft pending legal review.',
    paragraphs: [
      'GeoCobre uses the data you submit through the contact form (name, email, company, country and message) solely to answer your inquiry and follow up on a potential business relationship.',
      'Messages are transmitted through the Web3Forms service, which acts as the delivery processor. We do not sell or share your data with third parties for commercial purposes.',
      'You may request access to, correction or deletion of your data by writing to the email address below.',
    ],
    contactLabel: 'Privacy contact:',
    back: 'Back to home',
  },
  thanks: {
    title: 'Thank you for reaching out!',
    text: 'We received your inquiry and will get back to you shortly.',
    back: 'Back to home',
  },
  notFound: {
    title: 'Page not found',
    text: 'The page you are looking for does not exist or has been moved.',
    back: 'Back to home',
  },
};
