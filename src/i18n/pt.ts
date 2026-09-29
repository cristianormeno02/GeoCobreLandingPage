import type { Dictionary } from './types';

// Borrador de traducción (portugués de Brasil): pendiente de revisión técnica (tarea 6.3).
export const pt: Dictionary = {
  meta: {
    lang: 'pt',
    ogLocale: 'pt_BR',
    title: 'GeoCobre | Consultoria geológica e exploração mineral',
    description:
      'Assessoria integral em exploração mineral baseada em pesquisa aplicada: descrição de testemunhos e amostragem em campo, análise macro e microscópica de rochas em laboratório. Serviço TRL 5 validado em Morro del Cobre.',
  },
  skipLink: 'Pular para o conteúdo',
  nav: {
    label: 'Navegação principal',
    home: 'Início',
    links: {
      methodology: 'Metodologia',
      services: 'Serviços',
      validation: 'Validação',
      team: 'Equipe',
      training: 'Capacitação',
      alliances: 'Parcerias',
      contact: 'Contato',
    },
    cta: 'Solicitar assessoria',
    menuOpen: 'Abrir menu',
    menuClose: 'Fechar menu',
    languageLabel: 'Idioma',
  },
  hero: {
    title: 'Transformamos incerteza geológica em decisões estratégicas',
    subtitle:
      'Assessoria integral em exploração mineral baseada em pesquisa aplicada. Atuamos em campo e em laboratório para interpretar seus depósitos desde a origem, reduzindo riscos financeiros e impactos ambientais.',
    ctaPrimary: 'Solicitar assessoria',
    ctaSecondary: 'Ver serviços',
    badgeTrl: 'TRL 5',
    badgeTrlHint: 'Tecnologia validada em ambiente relevante',
    badgeValidated: 'Validado em Morro del Cobre',
  },
  methodology: {
    title: 'Metodologia baseada em pesquisa aplicada',
    intro:
      'Integramos amostragem, análise e interpretação de resultados a partir dos aspectos genéticos dos depósitos: entender como um depósito se formou permite decidir melhor onde e como explorá-lo.',
    steps: {
      sampling: {
        title: 'Amostragem',
        text: 'Planejamento e execução de amostragens representativas em campo, orientadas às questões geológicas-chave do projeto.',
      },
      analysis: {
        title: 'Análise',
        text: 'Estudo macroscópico e microscópico das amostras de rocha para caracterizar mineralogia, texturas e alterações.',
      },
      interpretation: {
        title: 'Interpretação',
        text: 'Integração dos resultados em um modelo genético do depósito que embasa as decisões de exploração.',
      },
    },
    benefitsTitle: 'Benefícios',
    benefits: {
      financial: {
        title: 'Redução do risco financeiro',
        text: 'Decisões de exploração fundamentadas que evitam investimentos em alvos com baixa probabilidade de sucesso.',
      },
      environmental: {
        title: 'Redução do impacto ambiental',
        text: 'Exploração mais focada, com menos intervenções desnecessárias no território.',
      },
    },
  },
  services: {
    title: 'Serviços',
    intro: 'Assessoria especializada em campo e laboratório para projetos de exploração mineral.',
    fieldTitle: 'Campo',
    labTitle: 'Laboratório',
    cta: 'Consultar',
    items: {
      logging: {
        title: 'Descrição de testemunhos',
        text: 'Descrição geológica sistemática de testemunhos e amostras de calha de sondagem.',
      },
      sampling: {
        title: 'Amostragem',
        text: 'Planejamento e coleta de amostras representativas para análises posteriores.',
      },
      fieldAdvisory: {
        title: 'Assessoria em campo',
        text: 'Acompanhamento técnico das equipes de exploração durante as campanhas de campo.',
      },
      macro: {
        title: 'Análise macroscópica',
        text: 'Caracterização de amostras de rocha a olho nu e com lupa: litologia, alteração e mineralização.',
      },
      micro: {
        title: 'Análise microscópica',
        text: 'Estudo de amostras de rocha ao microscópio para identificar minerais, texturas e relações paragenéticas.',
      },
    },
    interpretation: {
      title: 'Interpretação integrada de resultados',
      text: 'Unimos as informações de campo e laboratório em um relatório com conclusões e recomendações aplicáveis ao seu projeto.',
    },
  },
  validation: {
    title: 'Validação e maturidade tecnológica',
    intro:
      'Nosso serviço atingiu o nível de maturidade tecnológica TRL 5: a metodologia foi validada em um ambiente relevante de exploração real.',
    caseLabel: 'Caso de validação',
    caseTitle: 'Projeto Morro del Cobre',
    caseText:
      'A metodologia da GeoCobre foi aplicada e validada no projeto Morro del Cobre, integrando trabalho de campo, análises de laboratório e interpretação genética do depósito.',
    trlTitle: 'Escala de maturidade tecnológica (TRL)',
    trlLevel: 'Nível',
    trlCurrent: 'Nível atual da GeoCobre',
    trlLevels: [
      'Princípios básicos observados',
      'Conceito tecnológico formulado',
      'Prova de conceito experimental',
      'Tecnologia validada em laboratório',
      'Tecnologia validada em ambiente relevante',
      'Tecnologia demonstrada em ambiente relevante',
      'Protótipo demonstrado em ambiente operacional',
      'Sistema completo e qualificado',
      'Sistema comprovado em ambiente operacional',
    ],
  },
  team: {
    title: 'Equipe',
    intro: 'Profissionais de geologia com experiência em exploração mineral e pesquisa aplicada.',
    photoAlt: 'Foto de',
  },
  training: {
    title: 'Capacitação',
    intro: 'Cursos de formação em geologia aplicada à exploração mineral para profissionais, estudantes e instituições.',
    emptyTitle: 'Oferta de cursos em desenvolvimento',
    emptyText: 'Estamos preparando nossos primeiros cursos. Escreva para receber informações ou solicitar uma capacitação sob medida.',
    modality: 'Modalidade',
    cta: 'Solicitar informações',
  },
  alliances: {
    title: 'Parcerias estratégicas',
    intro: 'Buscamos construir uma rede de colaboração para fortalecer a pesquisa aplicada em exploração mineral.',
    types: {
      labs: {
        title: 'Laboratórios',
        text: 'Nacionais e internacionais, para complementar capacidades analíticas.',
      },
      government: {
        title: 'Órgãos governamentais',
        text: 'Para contribuir com conhecimento geológico para a gestão pública do território.',
      },
      mining: {
        title: 'Empresas de mineração',
        text: 'Para aplicar nossa metodologia em projetos de exploração.',
      },
      universities: {
        title: 'Universidades',
        text: 'Para impulsionar pesquisas conjuntas e a formação de profissionais.',
      },
    },
    partnersTitle: 'Organizações parceiras',
    cta: 'Propor uma parceria',
  },
  contact: {
    title: 'Contato',
    intro: 'Conte-nos sobre o seu projeto e responderemos em breve.',
    fields: {
      name: 'Nome completo',
      email: 'E-mail',
      company: 'Empresa ou instituição',
      country: 'País',
      type: 'Tipo de consulta',
      message: 'Mensagem',
      consent: 'Aceito o tratamento dos meus dados conforme o',
      consentLink: 'aviso de privacidade',
    },
    optional: 'opcional',
    typePlaceholder: 'Selecione uma opção',
    typeOptions: {
      field: 'Serviço de campo',
      lab: 'Análise laboratorial',
      training: 'Capacitação',
      alliance: 'Parceria estratégica',
      other: 'Outro',
    },
    messagePlaceholder: 'Descreva seu projeto, localização, tipo de depósito e prazos.',
    submit: 'Enviar consulta',
    sending: 'Enviando…',
    success: 'Obrigado! Recebemos sua consulta e responderemos em breve.',
    error: 'Não foi possível enviar sua mensagem. Tente novamente ou fale diretamente conosco:',
    errors: {
      required: 'Este campo é obrigatório.',
      email: 'Informe um e-mail válido.',
      messageMin: 'A mensagem deve ter pelo menos 20 caracteres.',
      consent: 'Você deve aceitar o aviso de privacidade.',
      type: 'Selecione um tipo de consulta.',
    },
    subject: 'Nova consulta pelo site da GeoCobre',
  },
  whatsapp: {
    label: 'Fale conosco pelo WhatsApp',
    message: 'Olá GeoCobre, gostaria de receber informações sobre seus serviços de assessoria geológica.',
  },
  footer: {
    tagline: 'Consultoria geológica e pesquisa aplicada à exploração mineral.',
    sectionsTitle: 'Seções',
    contactTitle: 'Contato',
    privacy: 'Aviso de privacidade',
    rights: 'Todos os direitos reservados.',
  },
  privacy: {
    title: 'Aviso de privacidade',
    draftNotice: 'Rascunho pendente de revisão jurídica.',
    paragraphs: [
      'A GeoCobre utiliza os dados enviados pelo formulário de contato (nome, e-mail, empresa, país e mensagem) exclusivamente para responder à sua consulta e dar seguimento a uma eventual relação comercial.',
      'As mensagens são transmitidas pelo serviço Web3Forms, que atua como operador do envio. Não vendemos nem cedemos seus dados a terceiros para fins comerciais.',
      'Você pode solicitar o acesso, a correção ou a exclusão dos seus dados escrevendo para o e-mail indicado abaixo.',
    ],
    contactLabel: 'Contato para assuntos de privacidade:',
    back: 'Voltar ao início',
  },
  thanks: {
    title: 'Obrigado pelo contato!',
    text: 'Recebemos sua consulta e responderemos em breve.',
    back: 'Voltar ao início',
  },
  notFound: {
    title: 'Página não encontrada',
    text: 'A página que você procura não existe ou foi movida.',
    back: 'Voltar ao início',
  },
};
