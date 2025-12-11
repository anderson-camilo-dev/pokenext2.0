import React from 'react';
import Image from 'next/image';

// Interface para o componente Page (recebe o ID da URL)
interface IdPageProps {
  params: {
    id: string; // O ID do Pokémon vindo da URL /id/[id]
  };
}

// Interface de dados detalhados do Pokémon
interface FullPokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: { type: { name: string } }[];
    imageUrl: string;
}

// Função para buscar os detalhes completos (incluindo altura, peso, tipo)
async function fetchFullPokemonDetails(pokemonId: string): Promise<FullPokemonDetails | null> {
    const API_URL = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    
    try {
        const response = await fetch(API_URL, {
            // Adicionado revalidate para cache, como na página principal
            next: { revalidate: 86400 },
        });

        if (!response.ok) {
            // Se o ID não for encontrado (ex: 404)
            return null;
        }

        const data = await response.json();

        // Extrai os nomes dos tipos e junta em uma string para exibição
        const types = data.types.map((typeSlot: any) => typeSlot.type.name);

        return {
            id: data.id,
            name: data.name.toUpperCase(),
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

// Componente de Página (Server Component)
export default async function IdPage({ params }: IdPageProps) {
    const pokemonId = params.id;
    const pokemon = await fetchFullPokemonDetails(pokemonId);

    if (!pokemon) {
        return (
            <div style={styles.container}>
                <h1 style={styles.nome}>Pokémon com ID "{pokemonId}" não encontrado.</h1>
            </div>
        );
    }
    
    // Formata os tipos para uma string legível
    const tipoString = pokemon.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)).join(' / ');


    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.nome}>{pokemon.name} <span style={{ color: '#888', fontSize: '0.6em' }}>#{pokemon.id}</span></h1>
                
                <Image 
                    src={pokemon.imageUrl} 
                    alt={`Sprite de ${pokemon.name}`} 
                    width={200} 
                    height={200} 
                    style={styles.imagem}
                    priority // Prioriza a imagem do detalhe
                />
                
                <div style={styles.detalhes}>
                    <p><strong>Tipo(s):</strong> {tipoString}</p>
                    <p><strong>Altura:</strong> {pokemon.height / 10} m</p> {/* A API retorna em decímetros */}
                    <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>   {/* A API retorna em hectogramas */}
                </div>
            </div>
        </div>
    );
};

// Estilos (Mantidos do seu pedido anterior)
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    padding: '20px',
    boxSizing: 'border-box',
    fontFamily: 'sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
    padding: '40px',
    textAlign: 'center',
    maxWidth: '550px', 
    width: '100%',
  },
  nome: {
    fontSize: '3em',
    color: '#333',
    marginBottom: '20px',
    textTransform: 'capitalize', // Para garantir que o nome da página seja legível
  },
  imagem: {
    width: '200px', 
    height: '200px',
    objectFit: 'contain',
    marginBottom: '30px',
    borderRadius: '8px',
    backgroundColor: '#ececec',
    padding: '15px',
    imageRendering: 'pixelated',
  },
  detalhes: {
    fontSize: '1.4em',
    color: '#555',
    textAlign: 'center',
    width: '100%',
    lineHeight: '1.8',
    borderTop: '1px solid #eee',
    paddingTop: '20px',
  },
};