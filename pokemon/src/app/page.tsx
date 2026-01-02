'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import PokemonCard, { Pokemon } from "@/app/components/PokemonCard";
import RandomPokemon from "@/app/components/RandomPokemon";
// Placeholder imports para componentes futuros
import PokemonComparison from "@/app/components/PokemonComparison";
import PokemonPersonalityQuiz from "./components/PokemonQuiz";


interface PokemonListResponse {
  count: number;
  results: { name: string; url: string }[];
}

async function fetchPokemonDetails(url: string): Promise<Pokemon & { types: string[] }> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Erro ao buscar detalhes: ${response.status}`);
  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    imageUrl: data.sprites.front_default || "/placeholder-pokemon.png",
    types: data.types.map((t: any) => t.type.name),
  };
}

export default function HomePage() {
  const [pokemons, setPokemons] = useState<(Pokemon & { types: string[] })[]>([]);
  const [busca, setBusca] = useState<string>("");
  const [tipoSelecionado, setTipoSelecionado] = useState<string>("");
  const [geracaoSelecionada, setGeracaoSelecionada] = useState<string>("");
  const [alturaMax, setAlturaMax] = useState<number | "">("");
  const [pesoMax, setPesoMax] = useState<number | "">("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<(Pokemon & { types: string[] }) | null>(null);

  // 🔹 Carrega pokémons iniciais
  useEffect(() => {
    async function fetchInitial() {
      setIsLoading(true);
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const data: PokemonListResponse = await res.json();
        const list = await Promise.all(data.results.map(p => fetchPokemonDetails(p.url)));
        setPokemons(list);
      } catch (err) { console.error(err); }
      finally { setIsLoading(false); }
    }
    fetchInitial();
  }, []);

  // 🔹 Busca e filtros
  useEffect(() => {
    async function applyFilters() {
      setIsLoading(true);
      try {
        // Busca por nome/ID
        if (busca.trim() !== "") {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${busca.toLowerCase()}`);
          if (!res.ok) { setSearchResult(null); return; }
          const data = await res.json();
          setSearchResult({
            id: data.id,
            name: data.name,
            imageUrl: data.sprites.front_default || "/placeholder-pokemon.png",
            types: data.types.map((t: any) => t.type.name),
          });
          setIsLoading(false);
          return;
        }

        // Filtro por tipo ou geração
        let url = tipoSelecionado ? `https://pokeapi.co/api/v2/type/${tipoSelecionado}` : "";
        if (geracaoSelecionada) url = `https://pokeapi.co/api/v2/generation/${geracaoSelecionada}`;
        if (url) {
          const res = await fetch(url);
          const data = await res.json();
          let list: any[] = [];

          if (tipoSelecionado) {
            list = await Promise.all(data.pokemon.slice(0, 50).map((p: any) => fetchPokemonDetails(p.pokemon.url)));
          } else if (geracaoSelecionada) {
            list = await Promise.all(data.pokemon_species.slice(0, 50).map(async (p: any) => {
              const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`);
              return fetchPokemonDetails(res.url);
            }));
          }

          // Filtro por altura/peso
          if (alturaMax) list = list.filter(p => (p as any).height <= alturaMax);
          if (pesoMax) list = list.filter(p => (p as any).weight <= pesoMax);

          setPokemons(list);
          setSearchResult(null);
        }
      } catch (err) { console.error(err); }
      finally { setIsLoading(false); }
    }

    const timeout = setTimeout(applyFilters, 300);
    return () => clearTimeout(timeout);
  }, [busca, tipoSelecionado, geracaoSelecionada, alturaMax, pesoMax]);

  return (
    <main className="min-h-screen flex flex-row gap-6 px-4 py-6">
      {/* Sidebar */}
      <aside className="w-80 flex-shrink- sticky top-6 self-start flex flex-col gap-6">
        <RandomPokemon />
        <PokemonComparison />
        <button className="">
        <PokemonPersonalityQuiz/>
      </button>
       
        <div className="p-4 bg-gray-800 rounded-lg  flex flex-col gap-2">
          <h3 className="font-bold text-lg">Filtros avançados</h3>

          <label>Geração</label>
          <select className="p-2 rounded" value={geracaoSelecionada} onChange={e => setGeracaoSelecionada(e.target.value)}>
            <option className="text-black/80" value="">Todas</option>
            <option className="text-black/80" value="1">1</option>
            <option className="text-black/80" value="2">2</option>
            <option className="text-black/80" value="3">3</option>
          </select>

          <label>Altura máxima (dm)</label>
          <input type="number" className="p-2 rounded" value={alturaMax} onChange={e => setAlturaMax(Number(e.target.value))} />

          <label>Peso máximo (hg)</label>
          <input type="number" className="p-2 rounded" value={pesoMax} onChange={e => setPesoMax(Number(e.target.value))} />
        </div>
      </aside>

      {/* Conteúdo principal */}
      <section className="flex-1">
        <div className="mb-10">
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
            className="mt-4 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option className="text-black/80" value="">Tipos</option>
            <option className="text-black/80" value="fire">Fogo</option>
            <option className="text-black/80" value="water">Água</option>
            <option className="text-black/80" value="grass">Grama</option>
            <option className="text-black/80" value="electric">Elétrico</option>
          </select>
        </div>

        {isLoading && <p className="text-center text-xl mt-10 text-gray-700">Carregando Pokémons...</p>}

        {!isLoading && searchResult && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Link href={`/descricao/${searchResult.id}`}>
              <PokemonCard pokemon={searchResult} />
            </Link>
          </div>
        )}

        {!isLoading && !searchResult && pokemons.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pokemons.map(p => (
              <Link href={`/descricao/${p.id}`} key={p.id}>
                <PokemonCard pokemon={p} />
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
