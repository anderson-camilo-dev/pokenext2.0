// src/app/descricao/[id]/page.tsx - Página de Detalhes do Pokémon

import React from 'react';
import Image from 'next/image';

// --- Interfaces de Detalhes ---
interface IdPageProps {
  params: {
    id: string; // O ID é recebido da URL
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

// --- Funções de Busca (Server Component) ---
async function fetchFullPokemonDetails(pokemonId: string): Promise<FullPokemonDetails | null> {
    // Usa o ID da URL para buscar na API
    const API_URL = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`; 
    
    try {
        const response = await fetch(API_URL, {
            next: { revalidate: 86400 }, 
        });

        if (!response.ok) {
            return null; 
        }

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
        console.error("Erro ao buscar detalhes:", error);
        return null;
    }
}

// --- Componente Principal (Página) ---
export default async function PokemonDetailPage({ params }: IdPageProps) {
    const pokemonId = params.id; 
    const pokemon = await fetchFullPokemonDetails(pokemonId);

    if (!pokemon) {
        return (
            <div >
                <h1 >Pokémon com ID "{pokemonId}" não encontrado.</h1>
            </div>
        );
    }
    
    // Formata a string de tipos
    const tipoString = pokemon.types
        .map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1))
        .join(' / ');


    return (
        <div >
            <div>
                <h1 >{pokemon.name.toUpperCase()} <span style={{ color: '#888', fontSize: '0.6em' }}>#{pokemon.id}</span></h1>
                
                <Image 
                    src={pokemon.imageUrl} 
                    alt={`Sprite de ${pokemon.name}`} 
                    width={200} 
                    height={200} 
                   
                    priority 
                />
                
                <div >
                    <p><strong>Tipo(s):</strong> {tipoString}</p>
                    <p><strong>Altura:</strong> {pokemon.height / 10} m</p> 
                    <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p> 
                </div>
            </div>
        </div>
    );
};
