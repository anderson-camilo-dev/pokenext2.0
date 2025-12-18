// src/app/components/PokemonCard.tsx

import React from "react";
// Importa o componente otimizado de imagem do Next.js.
import Image from "next/image";
import Link from "next/link";

// --- Interface de Dados (Tipagem) ---
// Define a estrutura de dados esperada para um objeto Pokémon.
// O 'export' permite que essa interface seja usada em outros arquivos (como page.tsx).
export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  // Campos adicionais (ex: type, abilities) seriam definidos aqui, se usados.
}

// --- Propriedades do Componente Card ---
// Define que o componente Card espera receber um objeto 'pokemon' que adere à interface Pokemon.
interface PokemonCardProps {
  pokemon: Pokemon;
}

// --- Componente de Card Funcional ---
// Define o componente PokemonCard como um Componente Funcional do React (React.FC).
const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    // O container principal do card, que usa estilos Flexbox para centralizar o conteúdo verticalmente.

    <div className="p-4 rounded-lg bg-black/50 shadow-md flex flex-col items-center m-4 border border-gray-200">
      {/* Componente Image otimizado do Next.js: */}

      <Image
        src={pokemon.imageUrl} // Fonte da imagem do Pokémon
        alt={pokemon.name} // Texto alternativo (importante para acessibilidade e SEO)
        width={130} // Largura da imagem em pixels
        height={200} // Altura da imagem em pixels
        // Estilos internos (margem, etc.)
        // Define a prioridade de carregamento para os primeiros Pokémons, melhorando a métrica LCP.
      />
     
       
        
        <h3>{pokemon.name}</h3>
    

      {/* Nome do Pokémon */}

      {/* ID do Pokémon, formatado com zeros à esquerda (ex: #001) */}
      <p>#{pokemon.id.toString().padStart(3, "0")}</p>
    </div>
  );
};

export default PokemonCard;
