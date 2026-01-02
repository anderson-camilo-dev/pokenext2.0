"use client";
import React, { useState } from "react";

type Personality = "fire" | "water" | "grass" | "electric" | "psychic" | "dark";

interface Answer {
  text: string;
  type: Personality;
}

interface Question {
  question: string;
  answers: Answer[];
}

const QUESTIONS: Question[] = [
  {
    question: "Quando algo dá errado, você geralmente:",
    answers: [
      { text: "Fica irritado, mas tenta resolver logo", type: "fire" },
      { text: "Respira fundo e pensa com calma", type: "water" },
      { text: "Aceita e segue em frente", type: "grass" },
      { text: "Tenta algo diferente na hora", type: "electric" },
    ],
  },
  {
    question: "Em um grupo de amigos, você costuma ser:",
    answers: [
      { text: "Quem toma a liderança", type: "fire" },
      { text: "Quem escuta todo mundo", type: "water" },
      { text: "Quem mantém o grupo unido", type: "grass" },
      { text: "Quem anima o ambiente", type: "electric" },
    ],
  },
  {
    question: "O que você mais valoriza em si mesmo?",
    answers: [
      { text: "Coragem", type: "fire" },
      { text: "Empatia", type: "water" },
      { text: "Lealdade", type: "grass" },
      { text: "Criatividade", type: "psychic" },
    ],
  },
  {
    question: "Quando precisa tomar uma decisão importante:",
    answers: [
      { text: "Decide rápido e confia no instinto", type: "fire" },
      { text: "Pensa nos sentimentos envolvidos", type: "water" },
      { text: "Avalia prós e contras", type: "psychic" },
      { text: "Observa tudo antes de agir", type: "dark" },
    ],
  },
  {
    question: "Seu ritmo de vida é mais:",
    answers: [
      { text: "Intenso", type: "fire" },
      { text: "Tranquilo", type: "water" },
      { text: "Constante", type: "grass" },
      { text: "Agitado", type: "electric" },
    ],
  },
  {
    question: "Como você lida com pressão?",
    answers: [
      { text: "Vai pra cima", type: "fire" },
      { text: "Mantém a calma", type: "water" },
      { text: "Se adapta aos poucos", type: "grass" },
      { text: "Analisa friamente", type: "dark" },
    ],
  },
  {
    question: "O que mais te irrita?",
    answers: [
      { text: "Injustiça", type: "fire" },
      { text: "Conflitos desnecessários", type: "water" },
      { text: "Mudanças bruscas", type: "grass" },
      { text: "Falta de lógica", type: "psychic" },
    ],
  },
  {
    question: "Você prefere trabalhar:",
    answers: [
      { text: "Sozinho", type: "dark" },
      { text: "Em equipe", type: "grass" },
      { text: "Liderando", type: "fire" },
      { text: "De forma livre", type: "electric" },
    ],
  },
  {
    question: "Quando aprende algo novo:",
    answers: [
      { text: "Aprende fazendo", type: "fire" },
      { text: "Observa primeiro", type: "water" },
      { text: "Vai passo a passo", type: "grass" },
      { text: "Gosta da teoria", type: "psychic" },
    ],
  },
  {
    question: "Como você lida com emoções?",
    answers: [
      { text: "Expressa tudo", type: "fire" },
      { text: "Guarda para si", type: "dark" },
      { text: "Equilibra bem", type: "grass" },
      { text: "Reflete sobre elas", type: "psychic" },
    ],
  },
  {
    question: "Qual dessas frases combina mais com você?",
    answers: [
      { text: "Nunca desisto", type: "fire" },
      { text: "Tudo tem seu tempo", type: "water" },
      { text: "Prefiro estabilidade", type: "grass" },
      { text: "Sempre penso diferente", type: "electric" },
    ],
  },
  {
    question: "Em situações novas, você:",
    answers: [
      { text: "Se joga sem medo", type: "fire" },
      { text: "Observa o ambiente", type: "dark" },
      { text: "Se adapta com calma", type: "water" },
      { text: "Fica curioso", type: "electric" },
    ],
  },
  {
    question: "O que mais te motiva?",
    answers: [
      { text: "Desafios", type: "fire" },
      { text: "Harmonia", type: "water" },
      { text: "Segurança", type: "grass" },
      { text: "Conhecimento", type: "psychic" },
    ],
  },
  {
    question: "Você se considera mais:",
    answers: [
      { text: "Emocional", type: "fire" },
      { text: "Sensível", type: "water" },
      { text: "Racional", type: "psychic" },
      { text: "Reservado", type: "dark" },
    ],
  },
  {
    question: "Quando alguém pede ajuda:",
    answers: [
      { text: "Ajuda na hora", type: "grass" },
      { text: "Escuta primeiro", type: "water" },
      { text: "Resolve do seu jeito", type: "fire" },
      { text: "Analisa a melhor solução", type: "psychic" },
    ],
  },
  {
    question: "Qual dessas qualidades você mais tem?",
    answers: [
      { text: "Determinação", type: "fire" },
      { text: "Compreensão", type: "water" },
      { text: "Paciência", type: "grass" },
      { text: "Inteligência", type: "psychic" },
    ],
  },
];

const RESULTS = {
  fire: {
    id: 6, // Charizard
    pokemon: "Charizard",
    description:
      "Você é uma pessoa intensa, determinada e cheia de energia. Gosta de desafios, não foge de conflitos e costuma assumir a liderança naturalmente. Às vezes pode agir por impulso, mas sua coragem inspira os outros.",
  },
  water: {
    id: 9, // Blastoise
    pokemon: "Blastoise",
    description:
      "Você é calmo, empático e sabe lidar bem com emoções. Prefere resolver tudo com diálogo e equilíbrio. As pessoas confiam em você porque transmite segurança e estabilidade.",
  },
  grass: {
    id: 3, // Venusaur
    pokemon: "Venusaur",
    description:
      "Você é leal, paciente e valoriza estabilidade. Gosta de ajudar, manter a harmonia e construir relações duradouras. Costuma ser o ponto de apoio de quem está ao seu redor.",
  },
  electric: {
    id: 25, // Pikachu
    pokemon: "Pikachu",
    description:
      "Você é animado, espontâneo e criativo. Gosta de novidades, odeia rotina e costuma trazer energia positiva para qualquer ambiente. Sua presença dificilmente passa despercebida.",
  },
  psychic: {
    id: 65, // Alakazam
    pokemon: "Alakazam",
    description:
      "Você é inteligente, analítico e gosta de entender tudo a fundo. Prefere pensar antes de agir e costuma tomar decisões bem calculadas. Aprende rápido e gosta de desafios mentais.",
  },
  dark: {
    id: 197, // Umbreon
    pokemon: "Umbreon",
    description:
      "Você é reservado, observador e estratégico. Prefere agir nos bastidores e analisar tudo antes de confiar. Quando cria laços, é extremamente fiel e protetor.",
  },
};

export default function PokemonPersonalityQuiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<Personality, number>>({
    fire: 0,
    water: 0,
    grass: 0,
    electric: 0,
    psychic: 0,
    dark: 0,
  });
  const [finished, setFinished] = useState(false);
  const resetQuiz = () => {
    setCurrent(0);
    setScores({
      fire: 0,
      water: 0,
      grass: 0,
      electric: 0,
      psychic: 0,
      dark: 0,
    });
    setFinished(false);
  };
  const answer = (type: Personality) => {
    setScores((prev) => ({ ...prev, [type]: prev[type] + 1 }));

    if (current + 1 < QUESTIONS.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const resultType = Object.entries(scores).sort(
    (a, b) => b[1] - a[1]
  )[0][0] as Personality;
  const result = RESULTS[resultType];

  if (finished) {
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${result.id}.png`;

    return (
      <div
        className="
  bg-gray-800 text-white rounded-lg
  p-4 sm:p-6
  flex flex-col gap-4
  h-[480px] sm:h-[520px] md:h-[560px]
  w-full max-w-md mx-auto
  overflow-y-auto
"
      >
        <h2 className="text-xl font-bold">Seu Pokémon é:</h2>

       <img
  src={imageUrl}
  alt={result.pokemon}
  className="
    w-32 h-32
    sm:w-40 sm:h-40
    md:w-48 md:h-48
    object-contain
  "
/>


       <p className="text-xl sm:text-2xl md:text-3xl text-yellow-400 font-bold">
  {result.pokemon}
</p>

       <p className="text-sm sm:text-base max-w-md text-center">
  {result.description}
</p>

      <button
  onClick={resetQuiz}
  className="
    mt-4
    bg-purple-600 hover:bg-purple-700
    px-4 py-2
    rounded font-semibold
    w-full sm:w-auto
  "
>
  Começar de novo
</button>

      </div>
    );
  }

  const q = QUESTIONS[current];

  return (
    <div className="bg-gray-800 p-6 rounded-lg text-white flex flex-col gap-4">
      <p className="text-sm opacity-70">
        Pergunta {current + 1} de {QUESTIONS.length}
      </p>

      <h3 className="font-bold">{q.question}</h3>

      {q.answers.map((a, i) => (
        <button
          key={i}
          onClick={() => answer(a.type)}
          className="bg-gray-600 hover:bg-gray-500 p-2 rounded"
        >
          {a.text}
        </button>
      ))}
    </div>
  );
}
