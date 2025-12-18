'use client';

import React, { useState } from 'react';
import Image from 'next/image';


interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    animated?: string | null;
    animated_shiny?: string | null;
  };
}

interface Props {
  pokemon: PokemonData;
}

const tipoCores: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-400',
  ice: 'bg-cyan-300',
  fighting: 'bg-red-800',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-700',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-500',
  bug: 'bg-green-700',
  rock: 'bg-gray-700',
  ghost: 'bg-indigo-900',
  dragon: 'bg-purple-800',
  dark: 'bg-gray-900',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

export default function PokemonDetailClient({ pokemon }: Props) {
  const [isShiny, setIsShiny] = useState(false);

  const spriteUrl = isShiny
    ? pokemon.sprites.animated_shiny || pokemon.sprites.front_shiny || pokemon.sprites.front_default
    : pokemon.sprites.animated || pokemon.sprites.front_default;

  return (
    <div className="flex justify-center mt-16">
      <div className="border border-gray-200 rounded-2xl bg-black/80 w-[650px] h-[350px] p-10 flex text-white">

        {/* Informações */}
        <div className="flex-1 flex flex-col justify-center gap-3 text-left">
          <h1 className="text-2xl text-gray-300">#{pokemon.id}</h1>
          <h1 className="font-mono tracking-wide text-4xl">{pokemon.name.toUpperCase()}</h1>

          <div className="flex gap-2 mt-2">
            {pokemon.types.map(t => (
              <span
                key={t.type.name}
                className={`px-3 py-1 rounded text-white ${tipoCores[t.type.name] || 'bg-gray-400'}`}
              >
                {t.type.name.toUpperCase()}
              </span>
            ))}
          </div>

          <div className="font-mono text-base mt-3">
            <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
            <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
          </div>

          <button
            onClick={() => setIsShiny(!isShiny)}
            className="mt-4 px-4 py-2 bg-yellow-400 rounded font-semibold text-black hover:bg-yellow-500 transition"
          >
            {isShiny ? 'Ver Normal' : 'Ver Shiny'}
          </button>
        </div>

        {/* Imagem com animação de "bouncing" */}
        <div className="flex items-center justify-end p-4">
          <Image
            src={spriteUrl || '/placeholder-pokemon.png'}
            alt={`Sprite de ${pokemon.name}`}
            width={250}
            height={250}
            priority
            className="animate-bounce" // Aqui está a animação do Tailwind
          />
        </div>

      </div>
    </div>
  );
}
