'use client';
import React, { useState } from "react";

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
}

export default function PokemonComparison() {
  const [first, setFirst] = useState<Pokemon | null>(null);
  const [second, setSecond] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPokemon = async (id: number) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    return {
      id: data.id,
      name: data.name,
      imageUrl: data.sprites.front_default || "/placeholder-pokemon.png",
      types: data.types.map((t: any) => t.type.name),
    };
  };

  const compare = async () => {
    setLoading(true);
    const firstId = Math.floor(Math.random() * 898) + 1;
    let secondId = Math.floor(Math.random() * 898) + 1;
    while (secondId === firstId) secondId = Math.floor(Math.random() * 898) + 1;

    const [p1, p2] = await Promise.all([fetchPokemon(firstId), fetchPokemon(secondId)]);
    setFirst(p1);
    setSecond(p2);
    setLoading(false);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white flex flex-col gap-2">
      <h3 className="font-bold text-lg">Comparar Pokémon</h3>
      <button onClick={compare} className="bg-green-600 hover:bg-green-700 p-2 rounded">
        Sortear Dois
      </button>

      {loading && <p>Carregando...</p>}

      {first && second && !loading && (
        <div className="flex justify-between mt-2">
          {[first, second].map(p => (
            <div key={p.id} className="flex flex-col items-center">
              <img src={p.imageUrl} alt={p.name} className="w-20 h-20" />
              <h4 className="capitalize font-bold">{p.name}</h4>
              <div className="flex gap-1 mt-1">
                {p.types.map(t => (
                  <span key={t} className="px-2 py-1 rounded text-white text-sm bg-gray-500">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
