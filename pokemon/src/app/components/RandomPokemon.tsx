'use client';
import React, { useState } from "react";

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
}

const typeColors: Record<string, string> = {
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-400",
  poison: "bg-purple-500",
  flying: "bg-indigo-300",
};

export default function RandomPokemon() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRandom = async () => {
    setLoading(true);
    const id = Math.floor(Math.random() * 898) + 1;
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokemon({
        id: data.id,
        name: data.name,
        imageUrl: data.sprites.front_default || "/placeholder-pokemon.png",
        types: data.types.map((t: any) => t.type.name),
      });
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white flex flex-col gap-2">
      <h3 className="font-bold text-lg">Pokémon Aleatório</h3>
      <button onClick={fetchRandom} className="bg-blue-600 hover:bg-blue-700 p-2 rounded">
        Sortear
      </button>

      {loading && <p>Carregando...</p>}

      {pokemon && !loading && (
        <div className="flex flex-col items-center mt-2">
          <img src={pokemon.imageUrl} alt={pokemon.name} className="w-20 h-20" />
          <h4 className="capitalize font-bold">{pokemon.name}</h4>
          <div className="flex gap-1 mt-1">
            {pokemon.types.map(t => (
              <span key={t} className={`px-2 py-1 rounded text-black text-sm ${typeColors[t] || "bg-gray-500"}`}>
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
