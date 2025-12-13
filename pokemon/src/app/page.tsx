"use client";

import Footer from "./components/Footer";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import PokemonCard, { Pokemon } from "@/app/components/PokemonCard";

interface PokemonListResponse {
  count: number;
  results: { name: string; url: string }[];
}

async function fetchPokemonDetails(
  url: string
): Promise<Pokemon & { types: string[] }> {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Erro ao buscar detalhes: ${response.status}`);
  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    imageUrl: data.sprites.front_default || "/placeholder-pokemon.png",
    types: data.types.map((t: any) => t.type.name),
  };
}

export default function HomePage() {
  const [pokemons, setPokemons] = useState<(Pokemon & { types: string[] })[]>(
    []
  );
  const [busca, setBusca] = useState<string>("");
  const [tipoSelecionado, setTipoSelecionado] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<
    (Pokemon & { types: string[] }) | null
  >(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // 🔹 Efeito para carregar os 20 primeiros pokémons na inicialização
  useEffect(() => {
    async function fetchInitialPokemons() {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );
        const data: PokemonListResponse = await response.json();

        const list = await Promise.all(
          data.results.map((p) => fetchPokemonDetails(p.url))
        );
        setPokemons(list);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchInitialPokemons();
  }, []);

  // 🔹 Efeito para busca por nome ou filtro por tipo
  useEffect(() => {
    async function searchPokemon() {
      setIsSearching(true);

      try {
        // 🔹 Caso tenha busca por nome/ID
        if (busca.trim() !== "") {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${busca.toLowerCase().trim()}`
          );
          if (!response.ok) {
            setSearchResult(null);
          } else {
            const data = await response.json();
            setSearchResult({
              id: data.id,
              name: data.name,
              imageUrl:
                data.sprites.front_default || "/placeholder-pokemon.png",
              types: data.types.map((t: any) => t.type.name),
            });
          }
          setIsSearching(false);
          return;
        }

        // 🔹 Caso tenha filtro por tipo
        if (tipoSelecionado !== "") {
          setIsLoading(true);
          const response = await fetch(
            `https://pokeapi.co/api/v2/type/${tipoSelecionado}`
          );
          const data = await response.json();

          const list = await Promise.all(
            data.pokemon
              .slice(0, 50)
              .map((p: any) => fetchPokemonDetails(p.pokemon.url))
          );
          setPokemons(list);
          setSearchResult(null);
          setIsLoading(false);
        }
      } catch (err) {
        console.error(err);
        setSearchResult(null);
        setIsLoading(false);
      } finally {
        setIsSearching(false);
      }
    }

    const timeout = setTimeout(searchPokemon, 400);
    return () => clearTimeout(timeout);
  }, [busca, tipoSelecionado]);

  return (
    <main className="min-h-screen">
      <div className="mb-4 container mx-auto mt-4 px-4">
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar Pokémon por nome ou ID..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <select
          value={tipoSelecionado}
          onChange={(e) => setTipoSelecionado(e.target.value)}
          className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white font-bold bg-gray-700"
        >
          <option value="">Todos os tipos</option>
          <option value="fire">Fogo</option>
          <option value="water">Água</option>
          <option value="grass">Grama</option>
          <option value="electric">Elétrico</option>
          <option value="poison">Veneno</option>
          <option value="flying">Voador</option>
        </select>
      </div>

      {isLoading && (
        <p className="text-center text-xl mt-10 text-gray-700">
          Carregando Pokémons...
        </p>
      )}
      {isSearching && busca && (
        <p className="text-center text-lg text-gray-500">Buscando...</p>
      )}

      {/* Resultado da busca */}
      {!isLoading && searchResult && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 container mx-auto">
          <Link href={`/descricao/${searchResult.id}`}>
            <PokemonCard pokemon={searchResult} />
          </Link>
        </div>
      )}

      {!isSearching && busca && !searchResult && (
        <p className="text-center text-gray-500 mt-8">
          Nenhum Pokémon encontrado com "{busca}"
        </p>
      )}

      {/* Lista filtrada por tipo ou inicial */}
      {!isLoading && !busca && pokemons.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 container mx-auto">
          {pokemons.map((pokemon) => (
            <Link href={`/descricao/${pokemon.id}`} key={pokemon.id}>
              <PokemonCard pokemon={pokemon} />
            </Link>
          ))}
        </div>
      )}

      <Footer />
    </main>
  );
}
