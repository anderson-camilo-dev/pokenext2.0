// src/app/page.tsx - Página de Listagem Principal

import React from 'react';
import Link from 'next/link'; // Componente de navegação do Next.js
// Importa o componente Card e a Interface (necessária para tipagem)
import PokemonCard, { Pokemon } from '@/app/components/PokemonCard'; 

// --- Interfaces para a API de Listagem ---
// Define a estrutura da resposta da PokeAPI para a lista inicial.
interface PokemonListResponse {
  count: number;
  results: { name: string; url: string; }[];
}

// --- Funções de Busca (Server Component) ---

// Função assíncrona para buscar detalhes de um único Pokémon (ID, Nome, Imagem)
async function fetchPokemonDetails(url: string): Promise<Pokemon> {
    const response = await fetch(url);
    if (!response.ok) {
        // Em produção, você usaria um sistema de logging aqui
        console.error(`Falha ao buscar detalhes da URL: ${url}`);
        throw new Error(`Falha ao buscar detalhes: ${response.status}`);
    }
    const data = await response.json();
    
    return {
        id: data.id,
        name: data.name,
        // Tenta pegar a imagem frontal padrão, se não, usa um placeholder
        imageUrl: data.sprites.front_default || '/placeholder-pokemon.png', 
    };
}

// Função para buscar a lista inicial e os detalhes essenciais
async function getDetailedPokemonList(): Promise<Pokemon[]> {
    // Busca os primeiros 20 Pokémons
    const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20'; 
    
    try {
        // 1. Busca a lista inicial
        const listResponse = await fetch(API_URL, {
            // Next.js cache: revalida (busca novos dados) a cada 24 horas
            next: { revalidate: 86400 }, 
        });
        
        const data: PokemonListResponse = await listResponse.json();
        
        // 2. Cria um array de Promises para buscar os detalhes em paralelo
        const detailPromises = data.results.map(pokemon => 
            fetchPokemonDetails(pokemon.url)
        );

        // 3. Espera que todas as Promises de detalhes sejam resolvidas
        return await Promise.all(detailPromises);

    } catch (error) {
        console.error('Erro fatal ao buscar lista de Pokémon:', error);
        return []; // Retorna lista vazia em caso de falha
    }
}

// --- Componente Principal da Página (Server Component) ---
export default async function HomePage() {
    // Await para obter os dados antes da renderização.
    const pokemons = await getDetailedPokemonList();

    return (
    <>
    
    <h1 className='text-red-600 text-center font-bold text-6xl mt-2.5 p-5'>Pokedex</h1>
    <div className='grid grid-cols-4  gap-2.5'>
        {pokemons.map((pokemons) => (
        <PokemonCard pokemon={pokemons} />
        ))}
    </div>

    
 
    </>
    


    
    );
}


/*   
    <div>
        {pokemons.map((pokemons) => (
          <li key={pokemons.id}> 
            <strong>{pokemons.name} </strong>
            <img src={pokemons.imageUrl} alt={pokemons.name} />
          </li>
        ))}
    </div>
    */