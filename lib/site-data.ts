/**
 * DADOS DO SITE: DIAS MAIS FITNESS
 * ------------------------------------------------------------------
 * Toda a informação comercial fica aqui, num lugar só.
 * Para atualizar preços, horários, textos ou contatos, edite apenas este arquivo.
 *
 * Fontes usadas (out/2026):
 *  - Instagram oficial @diasmaisfitness: fotos reais, grade de aulas (post de 25/ago/2026)
 *    e mensalidade "Musculação + aulas R$ 114,99" (post de 24/jul/2026).
 *  - Google Maps: endereço, nota 4,7 e 182 avaliações.
 *  - WhatsApp: o número (11) 3591-1207 abre a conta comercial "Academia Dias Mais Fitness".
 */

export const contact = {
  name: 'Dias Mais Fitness',
  phoneDisplay: '(11) 3591-1207',
  phoneHref: 'tel:+551135911207',
  /** Número no formato internacional, só dígitos (55 + DDD + número). */
  whatsappNumber: '551135911207',
  whatsappDefaultMessage: 'Olá! Vim pelo site e quero conhecer a Dias Mais Fitness.',
  instagram: 'https://www.instagram.com/diasmaisfitness/',
  instagramHandle: '@diasmaisfitness',
  facebook: 'https://www.facebook.com/diasmaisfitness',
  addressLine1: 'Av. Flora, 1052, Jaguaribe',
  addressLine2: 'Osasco, SP · CEP 06053-130',
  addressFull: 'Av. Flora, 1052, Jaguaribe, Osasco, SP, 06053-130',
  /** Dados públicos do Google (out/2026). Atualize se mudarem. */
  googleRating: '4,7',
  googleReviews: 182,
  /** Horário: só o fechamento às 22h foi informado. Confirmar os dias antes de publicar. */
  hoursNote: 'Fechamento às 22h. Confirme o horário de cada dia pelo WhatsApp.',
}

/** Monta um link wa.me com a mensagem já codificada corretamente para URL. */
export function whatsappLink(message: string = contact.whatsappDefaultMessage) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export const messages = {
  trial: 'Olá! Quero agendar uma aula experimental na Dias Mais Fitness. Qual o melhor dia e horário?',
  visit: 'Olá! Quero agendar uma visita para conhecer a Dias Mais Fitness.',
  plans: 'Olá! Quero saber os planos e valores da Dias Mais Fitness.',
  schedule: 'Olá! Quero confirmar os horários das aulas coletivas da Dias Mais Fitness.',
}

const mapsQuery = encodeURIComponent(`Dias Mais Fitness, ${contact.addressFull}`)
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`
export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`
export const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed&hl=pt-BR&z=16`

/**
 * Origem de cada foto:
 *  - 'real': foto da própria academia (perfil oficial @diasmaisfitness).
 *  - 'ilustrativa': foto de banco de imagens (Pexels), provisória até
 *    termos fotos reais. Créditos em /CREDITOS-IMAGENS.md
 */
export type PhotoSource = 'real' | 'ilustrativa'

export type Photo = {
  image: string
  alt: string
  source: PhotoSource
  /** Ajuste fino do enquadramento (CSS object-position). */
  focus?: string
}

/** Hero: fachada real (principal) + foto de treino (detalhe). */
export const heroPhotos: { main: Photo; detail: Photo } = {
  main: {
    image: '/images/hero-fachada.jpg',
    alt: 'Fachada da Dias Mais Fitness na Av. Flora, 1052, com o logo laranja da academia',
    source: 'real',
    focus: '30% 60%',
  },
  detail: {
    image: '/images/hero-detalhe.jpg',
    alt: 'Aluno fazendo tríceps na polia em área de musculação',
    source: 'ilustrativa',
    focus: '28% 50%',
  },
}

/* ------------------------------------------------------------------ */
/* A academia                                                          */
/* ------------------------------------------------------------------ */

export const aboutPhotos: Photo[] = [
  {
    image: '/images/hero-interior.jpg',
    alt: 'Aluno treinando ombros acompanhado por um membro da equipe na Dias Mais Fitness',
    source: 'real',
    focus: '50% 55%',
  },
  {
    image: '/images/parede-logo.jpg',
    alt: 'Logo da Dias Mais Fitness na parede da academia',
    source: 'real',
    focus: '35% 45%',
  },
]

/** Diferenciais: só fatos verificáveis (grade, plano, endereço). */
export const highlights = [
  {
    title: 'Musculação e aulas no mesmo plano',
    text: 'A mensalidade divulgada pela academia inclui musculação e aulas coletivas.',
  },
  {
    title: 'Aulas de manhã, almoço e noite',
    text: 'A grade tem turmas a partir das 7h30 e até as 20h, de segunda a sábado.',
  },
  {
    title: 'Lutas na grade semanal',
    text: 'Boxe, Muay Thai e Hitbox em turmas fixas, além do treino de musculação.',
  },
  {
    title: 'Aula experimental',
    text: 'Antes de fechar plano, venha treinar uma vez e conhecer a estrutura.',
  },
]

/* ------------------------------------------------------------------ */
/* Estrutura                                                           */
/* ------------------------------------------------------------------ */

/**
 * Galeria em Bento Grid. `size` define o bloco no desktop:
 *  - 'hero': bloco grande (2 colunas x 2 linhas)
 *  - 'tall': vertical (1 x 2)
 *  - 'wide': horizontal (2 x 1)
 *  - 'small': quadrado (1 x 1)
 * A ordem do array é a ordem na grade.
 */
export type BentoItem = Photo & { title: string; text: string; size: 'hero' | 'tall' | 'wide' | 'small' }

export const bento: BentoItem[] = [
  {
    size: 'hero',
    title: 'Área de musculação',
    text: 'Aparelhos para todos os grupos musculares, do iniciante ao avançado.',
    image: '/images/hero-academia.jpg',
    alt: 'Salão de musculação com alunos treinando nos aparelhos',
    source: 'ilustrativa',
    focus: '55% 55%',
  },
  {
    size: 'tall',
    title: 'Nossa fachada',
    text: 'Av. Flora, 1052, Jaguaribe.',
    image: '/images/hero-fachada.jpg',
    alt: 'Fachada da Dias Mais Fitness com o logo laranja da academia',
    source: 'real',
    focus: '35% 70%',
  },
  {
    size: 'small',
    title: 'Peso livre',
    text: 'Racks, barras e anilhas.',
    image: '/images/estrutura-peso-livre.jpg',
    alt: 'Racks vermelhos com barras e anilhas na área de peso livre',
    source: 'ilustrativa',
    focus: '30% 50%',
  },
  {
    size: 'small',
    title: 'Cardio',
    text: 'Esteiras para aquecer e condicionar.',
    image: '/images/estrutura-cardio.jpg',
    alt: 'Alunos caminhando em esteiras na área de cardio',
    source: 'ilustrativa',
    focus: '50% 50%',
  },
  {
    size: 'wide',
    title: 'Aulas coletivas',
    text: 'Jump, step, dança e lutas em turmas de manhã, no almoço e à noite.',
    image: '/images/estrutura-aulas.jpg',
    alt: 'Turma de aula coletiva fazendo exercícios em estúdio',
    source: 'ilustrativa',
    focus: '50% 45%',
  },
  {
    size: 'small',
    title: 'Treino orientado',
    text: 'Ajuste de carga e execução.',
    image: '/images/estrutura-orientacao.jpg',
    alt: 'Professor auxiliando aluno no supino com barra',
    source: 'ilustrativa',
    focus: '62% 40%',
  },
  {
    size: 'small',
    title: 'Funcional',
    text: 'Medicine balls e acessórios.',
    image: '/images/estrutura-funcional.jpg',
    alt: 'Rack com medicine balls e anilhas em área de treino funcional',
    source: 'ilustrativa',
    focus: '35% 50%',
  },
]

/* ------------------------------------------------------------------ */
/* Modalidades                                                         */
/* ------------------------------------------------------------------ */

export type Modality = Photo & {
  title: string
  category: 'Musculação' | 'Lutas' | 'Dança' | 'Condicionamento' | 'Corpo e mente'
  description: string
}

export const modalities: Modality[] = [
  {
    title: 'Musculação',
    category: 'Musculação',
    description: 'Treino de força nos aparelhos e no peso livre, no seu ritmo e com orientação.',
    image: '/images/musculacao-puxada.jpg',
    alt: 'Aluno treinando costas no aparelho de puxada da Dias Mais Fitness',
    source: 'real',
    focus: '50% 60%',
  },
  {
    title: 'Boxe',
    category: 'Lutas',
    description: 'Base, golpes e combinações com muito condicionamento. Terças e quintas à noite.',
    image: '/images/boxe-treino.jpg',
    alt: 'Alunos treinando golpes de boxe na Dias Mais Fitness',
    source: 'real',
    focus: '50% 50%',
  },
  {
    title: 'Muay Thai',
    category: 'Lutas',
    description: 'Socos, chutes, joelhadas e cotoveladas. Quarta à noite e sábado de manhã.',
    image: '/images/muay-thai-luvas.jpg',
    alt: 'Aluna com luvas e caneleiras de Muay Thai na Dias Mais Fitness',
    source: 'real',
    focus: '50% 45%',
  },
  {
    title: 'Jump',
    category: 'Condicionamento',
    description: 'Aula aeróbica no mini trampolim, com músicas animadas e alto gasto calórico.',
    image: '/images/modalidade-jump.jpg',
    alt: 'Pés de pessoa saltando sobre um trampolim',
    source: 'ilustrativa',
    focus: '38% 50%',
  },
  {
    title: 'Zumba',
    category: 'Dança',
    description: 'Ritmos latinos e coreografias simples para suar se divertindo.',
    image: '/images/modalidade-zumba.jpg',
    alt: 'Turma de aula de dança com os braços para o alto',
    source: 'ilustrativa',
    focus: '78% 50%',
  },
  {
    title: 'FitDance',
    category: 'Dança',
    description: 'Coreografias com os hits do momento. Turmas de manhã e à noite.',
    image: '/images/modalidade-fitdance.jpg',
    alt: 'Grupo dançando em aula de dança fitness',
    source: 'ilustrativa',
    focus: '50% 40%',
  },
  {
    title: 'Sertanejo',
    category: 'Dança',
    description: 'Aula de dança no ritmo do sertanejo para fechar a semana. Sexta às 19h.',
    image: '/images/modalidade-sertanejo.jpg',
    alt: 'Casal dançando, em detalhe dos pés no salão',
    source: 'ilustrativa',
    focus: '62% 50%',
  },
  {
    title: 'Pilates',
    category: 'Corpo e mente',
    description: 'Fortalecimento, postura e mobilidade com exercícios guiados. Turmas de manhã e à noite.',
    image: '/images/modalidade-pilates.jpg',
    alt: 'Turma fazendo exercícios em colchonetes durante aula em estúdio',
    source: 'ilustrativa',
    focus: '50% 50%',
  },
]

/** Outras aulas que aparecem na grade oficial, sem card próprio. */
export const otherClasses = ['GAP', 'Step', 'Funcional', 'Hitbox', 'Abdômen', 'Glúteos', 'Alongamento']

/* ------------------------------------------------------------------ */
/* Grade de aulas coletivas                                            */
/* Transcrita do post oficial de 25/ago/2026. Atualize quando mudar.   */
/* ------------------------------------------------------------------ */

export const scheduleUpdatedAt = 'agosto de 2026'

export type ClassSlot = { time: string; name: string }
export type ScheduleDay = { id: string; short: string; label: string; classes: ClassSlot[] }

export const schedule: ScheduleDay[] = [
  {
    id: 'seg',
    short: 'Seg',
    label: 'Segunda',
    classes: [
      { time: '07:30', name: 'Jump' },
      { time: '08:00', name: 'Abdômen' },
      { time: '13:30', name: 'Step' },
      { time: '18:30', name: 'Pilates' },
      { time: '19:00', name: 'FitDance' },
      { time: '19:30', name: 'Glúteos' },
    ],
  },
  {
    id: 'ter',
    short: 'Ter',
    label: 'Terça',
    classes: [
      { time: '08:30', name: 'FitDance' },
      { time: '09:00', name: 'Pilates' },
      { time: '19:00', name: 'Zumba' },
      { time: '19:30', name: 'Funcional' },
      { time: '20:00', name: 'Boxe' },
    ],
  },
  {
    id: 'qua',
    short: 'Qua',
    label: 'Quarta',
    classes: [
      { time: '08:30', name: 'GAP' },
      { time: '09:00', name: 'Step' },
      { time: '13:30', name: 'GAP' },
      { time: '19:00', name: 'FitDance' },
      { time: '19:30', name: 'Jump' },
      { time: '20:00', name: 'Muay Thai' },
    ],
  },
  {
    id: 'qui',
    short: 'Qui',
    label: 'Quinta',
    classes: [
      { time: '08:30', name: 'FitDance' },
      { time: '09:00', name: 'Pilates' },
      { time: '18:00', name: 'GAP' },
      { time: '18:30', name: 'Alongamento' },
      { time: '19:00', name: 'Hitbox' },
      { time: '20:00', name: 'Boxe' },
    ],
  },
  {
    id: 'sex',
    short: 'Sex',
    label: 'Sexta',
    classes: [
      { time: '07:30', name: 'Zumba' },
      { time: '08:00', name: 'Alongamento' },
      { time: '19:00', name: 'Sertanejo' },
    ],
  },
  {
    id: 'sab',
    short: 'Sáb',
    label: 'Sábado',
    classes: [{ time: '10:00', name: 'Muay Thai' }],
  },
]

export const weeklyClassCount = schedule.reduce((total, day) => total + day.classes.length, 0)

/* ------------------------------------------------------------------ */
/* Planos                                                              */
/* ------------------------------------------------------------------ */

/**
 * ATENÇÃO: VALORES DEMONSTRATIVOS.
 * Preços e benefícios abaixo são exemplos para apresentar o site ao cliente.
 * Troque pelos valores oficiais da academia antes de publicar e,
 * depois disso, mude `plansAreDemo` para false (o aviso some do site).
 */
export const plansAreDemo = true

export type Plan = {
  id: string
  title: string
  /** Valor mensal em reais (número). Ex.: 119.9 */
  monthly: number
  /** Quantos meses o plano cobre (1, 3, 12...). Usado para calcular total e economia. */
  months: number
  benefits: string[]
  /** Destaque discreto (ex.: melhor custo-benefício). */
  badge?: string
  featured?: boolean
}

export const plans: Plan[] = [
  {
    id: 'mensal',
    title: 'Mensal',
    monthly: 119.9,
    months: 1,
    benefits: ['Musculação livre', 'Lutas e aulas coletivas da grade', 'Renovação mês a mês'],
  },
  {
    id: 'trimestral',
    title: 'Trimestral',
    monthly: 99.9,
    months: 3,
    benefits: ['Tudo do plano mensal', 'Pagamento a cada 3 meses'],
  },
  {
    id: 'anual',
    title: 'Anual',
    monthly: 79.9,
    months: 12,
    benefits: ['Tudo do plano mensal', 'Menor valor por mês'],
    badge: 'Melhor custo-benefício',
    featured: true,
  },
]

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
export const formatBRL = (value: number) => brl.format(value).replace(/\u00a0/g, ' ')

/** Valor de referência para calcular a economia (o plano mensal). */
export const baseMonthly = plans.find((plan) => plan.months === 1)?.monthly ?? plans[0].monthly

/* ------------------------------------------------------------------ */
/* Como começar                                                        */
/* ------------------------------------------------------------------ */

export const startSteps = [
  {
    title: 'Chame no WhatsApp',
    text: 'Diga se prefere musculação, luta ou alguma aula. A equipe responde com os horários disponíveis.',
  },
  {
    title: 'Faça a aula experimental',
    text: 'Venha treinar uma vez, conheça a estrutura e tire suas dúvidas pessoalmente.',
  },
  {
    title: 'Escolha o plano e comece',
    text: 'Com tudo definido, é só fechar o plano e montar sua rotina de treinos.',
  },
]
