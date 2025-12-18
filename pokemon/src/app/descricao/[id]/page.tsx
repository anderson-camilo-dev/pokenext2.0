// src/app/descricao/[id]/page.tsx - Página de Detalhes do Pokémon

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- Interfaces de Tipagem ---
interface IdPageProps {
  params: {
    id: string; // ID recebido da URL
  };
}

interface FullPokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  imageUrl: string;
}

// --- Função para Buscar Detalhes do Pokémon (Server Component) ---
async function fetchFullPokemonDetails(pokemonId: string): Promise<FullPokemonDetails | null> {
  const API_URL = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

  

  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 86400 }, // 24h de revalidação
    });

    if (!response.ok) return null;

    const data = await response.json();

    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      types: data.types,
      imageUrl: data.sprites.front_default || '/placeholder-pokemon.png',
    };
  } catch (error) {
    console.error('Erro ao buscar detalhes:', error);
    return null;
  }
}

// --- Componente Principal (Página de Detalhes do Pokémon) ---
export default async function PokemonDetailPage({ params }: IdPageProps) {
  const pokemonId = params.id;
  const pokemon = await fetchFullPokemonDetails(pokemonId);

  if (!pokemon) {
    return (
      <div className="flex justify-center mt-16">
        <h1 className="text-xl text-red-500">
          Pokémon com ID "{pokemonId}" não encontrado.
        </h1>
      </div>
    );
  }

  // Formata os tipos do Pokémon (ex.: "Grass / Poison")
  const tipoString = pokemon.types
    .map((t) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1))
    .join(' / ');

  return (
    <div className="flex justify-center mt-16">
      <div className="border border-gray-200 rounded-2xl bg-black/80 w-[650px] h-[320px] p-10 flex text-white">

        {/* --- INFORMAÇÕES DO POKÉMON --- */}
        <div className="flex-1 flex flex-col justify-center gap-3 text-left">
          <h1 className="text-2xl text-gray-300">#{pokemon.id}</h1>
          <h1 className="font-mono tracking-wide text-4xl">{pokemon.name.toUpperCase()}</h1>

          <div className="font-mono text-base mt-3">
            <p><strong>Tipo(s):</strong> {tipoString}</p>
            <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
            <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
          </div>
        </div>

        {/* --- IMAGEM DO POKÉMON --- */}
        <div className="flex items-center justify-end p-4">
          <Image
            src={pokemon.imageUrl}
            alt={`Sprite de ${pokemon.name}`}
            width={250}
            height={250}
            priority
          />
        </div>

      </div>
    </div>
  );
}
