'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import PokemonCard, { Pokemon } from '@/app/components/PokemonCard';

interface PokemonListResponse {
  count: number;
  results: { name: string; url: string }[];
}



async function fetchPokemonDetails(url: string): Promise<Pokemon> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Erro ao buscar detalhes: ${response.status}`);
  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    imageUrl: data.sprites.front_default || '/placeholder-pokemon.png',
  };
}

export default function HomePage() {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [busca, setBusca] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchResult, setSearchResult] = useState<Pokemon | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // 🔹 Carrega apenas 20 pokémons no início
  useEffect(() => {
    async function loadPokemons() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const data: PokemonListResponse = await res.json();

        const promises = data.results.map(p => fetchPokemonDetails(p.url));
        const list = await Promise.all(promises);

        setAllPokemons(list);
      } catch (err) {
        console.error("Erro na API:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadPokemons();
  }, []);

  // 🔎 Busca ilimitada na API (fora dos 20 iniciais)
  useEffect(() => {
    async function searchPokemon() {
      if (busca.trim() === "") {
        setSearchResult(null);
        return;
      }

      setIsSearching(true);

      const term = busca.toLowerCase().trim();

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${term}`);
        if (!response.ok) {
          setSearchResult(null);
          return;
        }

        const data = await response.json();

        setSearchResult({
          id: data.id,
          name: data.name,
          imageUrl: data.sprites.front_default,
        });

      } catch {
        setSearchResult(null);
      } finally {
        setIsSearching(false);
      }
    }

    const timeout = setTimeout(searchPokemon, 400); // debounce

    return () => clearTimeout(timeout);
  }, [busca]);

  return (
    <main className="min-h-screen">

      {/* 🔍 Barra de busca */}
      <div className="mb-4 container mx-auto mt-4 px-4">
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar Pokémon por nome ou ID..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        
      </div>

      {/* LOADING inicial */}
      {isLoading && (
        <p className="text-center text-xl mt-10 text-gray-700">
          Carregando Pokémons...
        </p>
      )}

      {/* LOADING da busca */}
      {isSearching && busca && (
        <p className="text-center text-lg text-gray-500">Buscando...</p>
      )}

      {/* ------------------ */}
      {/* RESULTADO DA BUSCA */}
      {/* ------------------ */}
      {!isLoading && busca !== "" && searchResult && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                        lg:grid-cols-4 gap-4 p-4 container mx-auto">
          <Link href={`/descricao/${searchResult.id}`}>
            <PokemonCard pokemon={searchResult} />
          </Link>
        </div>
      )}

      {/* Caso nada encontrado */}
      {!isSearching && busca !== "" && !searchResult && (
        <p className="text-center text-gray-500 mt-8">
          Nenhum Pokémon encontrado com "{busca}"
        </p>
      )}

      {/* ------------------------ */}
      {/* LISTA INICIAL DE 20     */}
      {/* ------------------------ */}
      {!isLoading && busca === "" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                        lg:grid-cols-4 gap-4 p-4 container mx-auto">

          {allPokemons.map(pokemon => (
            <Link href={`/descricao/${pokemon.id}`} key={pokemon.id}>
              <PokemonCard pokemon={pokemon} />
            </Link>
          ))}
        </div>
      )}

    </main>
  );
}
