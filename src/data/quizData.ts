export type QuizOption = {
  label: string;
  value: string;
  emoji?: string;
};

export type QuizStep = {
  id: string;
  question: string;
  subtitle?: string;
  options: QuizOption[];
  multiSelect?: boolean;
  type?: "radio" | "multi" | "slider";
  sliderConfig?: {
    min: number;
    max: number;
    default: number;
    unit: string;
    altUnit?: string;
  };
  testimonial?: {
    name: string;
    role: string;
    avatar: string;
    text: string;
    highlight?: string;
  };
  twoCol?: boolean;
};

export const quizSteps: QuizStep[] = [
  {
    id: "age",
    question: "Desafio específico para sua idade e objetivo:",
    subtitle: "Escolha uma opção abaixo:",
    twoCol: true,
    options: [
      { label: "30–40 anos", value: "30-40" },
      { label: "41–50 anos", value: "41-50" },
      { label: "51–60 anos", value: "51-60" },
      { label: "61–70 anos", value: "61-70" },
      { label: "70+ anos", value: "70+" },
    ],
  },
  {
    id: "body-type",
    question: "Como você classifica seu corpo hoje?",
    twoCol: true,
    options: [
      { label: "Muito acima do peso", value: "muito-acima", emoji: "🙍‍♀️" },
      { label: "Um pouco acima do peso", value: "pouco-acima", emoji: "🚶‍♀️" },
      { label: "Falsa magra", value: "falsa-magra", emoji: "🏃‍♀️" },
      { label: "Magra", value: "magra", emoji: "🤸‍♀️" },
    ],
  },
  {
    id: "metabolism",
    question: "Como é o seu metabolismo?",
    options: [
      { label: "Lento – Difícil para perder e fácil para ganhar peso", value: "lento", emoji: "🐢" },
      { label: "Acelerado – Fácil de perder e difícil para ganhar peso", value: "acelerado", emoji: "🔥" },
    ],
  },
  {
    id: "weight-goal",
    question: "Quantos quilos você gostaria de eliminar?",
    twoCol: true,
    options: [
      { label: "0–5 kg", value: "0-5" },
      { label: "6–10 kg", value: "6-10" },
      { label: "11–15 kg", value: "11-15" },
      { label: "16–20 kg", value: "16-20" },
      { label: "Mais de 21 kg", value: "21+" },
    ],
    testimonial: {
      name: "Vivan Almeida",
      role: "Autônoma",
      avatar: "👩",
      text: "Quando passei dos 40 meu corpo piorou muito na pré-menopausa, principalmente a barriga. Em 3 meses no pilates em casa consegui recuperar minha barriga dos 25 anos e ",
      highlight: "perdi 5kg em 2 meses.",
    },
  },
  {
    id: "other-goals",
    question: "Além de emagrecer, quais são seus outros objetivos?",
    subtitle: "Pode marcar vários:",
    type: "multi",
    multiSelect: true,
    options: [
      { label: "Perder barriga/gordura localizada", value: "barriga" },
      { label: "Melhorar flacidez", value: "flacidez" },
      { label: "Melhorar dores", value: "dores" },
      { label: "Mais disposição e energia", value: "disposicao" },
      { label: "Melhorar a saúde", value: "saude" },
    ],
  },
  {
    id: "desired-body",
    question: "Qual é o corpo que você gostaria de ter?",
    twoCol: true,
    options: [
      { label: "Bem magro", value: "bem-magro", emoji: "🏃‍♀️" },
      { label: "Um pouco mais magro", value: "pouco-magro", emoji: "🚴‍♀️" },
      { label: "Definido", value: "definido", emoji: "💪" },
    ],
  },
  {
    id: "weight-impact",
    question: "Como o seu peso tem impactado a sua vida?",
    subtitle: "Pode escolher várias opções:",
    type: "multi",
    multiSelect: true,
    options: [
      { label: "Minha autoestima e confiança estão baixas", value: "autoestima", emoji: "😞" },
      { label: "Me sinto cansada e com pouca disposição ao longo do dia", value: "cansaco", emoji: "😴" },
      { label: "Tenho problemas de saúde: dores, pressão, exames alterados...", value: "saude", emoji: "😨" },
      { label: "Me sinto invisível e pouco atraente", value: "invisivel", emoji: "👎" },
    ],
  },
  {
    id: "body-response",
    question: "Percebe que seu corpo não responde mesmo fazendo exercícios, dietas ou outras estratégias?",
    options: [
      { label: "Sim, meu corpo não responde", value: "sim", emoji: "📦" },
      { label: "Mais ou menos, responde bem lento", value: "mais-ou-menos", emoji: "😕" },
    ],
  },
  {
    id: "belly-fat",
    question: "Você acumula gordura na barriga com facilidade?",
    subtitle: "A famosa barriga da menopausa",
    options: [
      { label: "Sim, é o principal lugar", value: "sim", emoji: "😤" },
      { label: "Acumulo mais em outros locais", value: "outros", emoji: "😒" },
    ],
  },
  {
    id: "routine",
    question: "Como é o seu dia a dia?",
    options: [
      { label: "Trabalho fora e tenho uma rotina corrida", value: "fora", emoji: "🚗" },
      { label: "Trabalho em casa e tenho uma rotina flexível", value: "casa", emoji: "🏠" },
      { label: "Atualmente não trabalho", value: "nao-trabalho", emoji: "😊" },
    ],
  },
  {
    id: "symptoms",
    question: "Quais desses sintomas da menopausa você sente?",
    subtitle: "Pode escolher várias opções:",
    type: "multi",
    multiSelect: true,
    options: [
      { label: "Calorão", value: "calorao", emoji: "🔥" },
      { label: "Cansaço e falta de energia", value: "cansaco", emoji: "😴" },
      { label: "Dores no corpo", value: "dores", emoji: "😨" },
      { label: "Irritabilidade/alteração do humor", value: "irritabilidade", emoji: "😡" },
      { label: "Ansiedade", value: "ansiedade", emoji: "😤" },
    ],
  },
  {
    id: "weight",
    question: "Qual é o seu peso atual?",
    type: "slider",
    options: [],
    sliderConfig: {
      min: 40,
      max: 130,
      default: 70,
      unit: "kg",
      altUnit: "lb",
    },
  },
  {
    id: "height",
    question: "Qual é a sua altura?",
    type: "slider",
    options: [],
    sliderConfig: {
      min: 140,
      max: 190,
      default: 160,
      unit: "cm",
      altUnit: "pol",
    },
  },
  {
    id: "frequency",
    question: "Quantas vezes por semana você faz/pretende fazer exercícios?",
    options: [
      { label: "1–2x na semana", value: "1-2x" },
      { label: "3–4x na semana", value: "3-4x" },
      { label: "5x ou mais na semana", value: "5x+" },
    ],
  },
  {
    id: "benefits",
    question: "Quais benefícios você quer ter ao emagrecer?",
    subtitle: "Pode escolher várias opções:",
    type: "multi",
    multiSelect: true,
    options: [
      { label: "Me sentir mais bonita e atraente", value: "bonita", emoji: "👗" },
      { label: "Poder colocar uma roupa e ela vestir bem", value: "roupa", emoji: "👘" },
      { label: "Olhar no espelho e se sentir bem comigo", value: "espelho", emoji: "🪞" },
      { label: "Receber elogios das pessoas próximas", value: "elogios", emoji: "👏" },
      { label: "Ter energia e disposição", value: "energia", emoji: "🏃‍♀️" },
    ],
  },
  {
    id: "food-habits",
    question: "Como são seus hábitos alimentares atualmente?",
    subtitle: "Pode escolher várias opções:",
    type: "multi",
    multiSelect: true,
    options: [
      { label: "Amo comer doces", value: "doces", emoji: "🍫" },
      { label: "Prefiro praticidade e coisas do dia a dia", value: "praticidade", emoji: "✅" },
      { label: "Tenho uma alimentação saudável", value: "saudavel", emoji: "🥗" },
      { label: "Bebo refrigerantes", value: "refrigerantes", emoji: "🥤" },
      { label: "Gosto de frituras e coisas salgadas", value: "frituras", emoji: "🍟" },
      { label: "Consumo bebidas alcoólicas", value: "alcool", emoji: "🍺" },
    ],
  },
  {
    id: "belief",
    question: "Você acredita que um protocolo com treinos fáceis de 10 minutos, sem impacto e no conforto da sua casa, te ajudaria?",
    options: [
      { label: "Sim, é exatamente o que eu preciso", value: "sim", emoji: "😁" },
      { label: "Vale o teste", value: "vale", emoji: "💪" },
    ],
  },
  {
    id: "negative-future",
    question: "Se nada mudar, como será sua vida daqui um tempo?",
    options: [
      { label: "Vou estar mais gorda e feia", value: "gorda", emoji: "🙈" },
      { label: "Minha saúde vai piorar muito", value: "saude", emoji: "😵" },
      { label: "Nenhuma roupa vai vestir bem", value: "roupa", emoji: "👕" },
      { label: "Vou me sentir muito mal", value: "mal", emoji: "😭" },
    ],
  },
  {
    id: "commitment",
    question: "Você está disposta a dedicar 10 minutos por dia nas próximas semanas para mudar sua realidade?",
    options: [
      { label: "Sim, preciso mudar", value: "sim", emoji: "😁" },
      { label: "Estou disposta a pelo menos tentar", value: "tentar", emoji: "🙏" },
    ],
  },
];
