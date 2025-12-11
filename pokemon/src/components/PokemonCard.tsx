import Image from "next/image";
import React from 'react'; // Importar React é uma boa prática

// Interface (Melhor deixá-la aqui se este for o único lugar onde é usada, ou exportar de um arquivo separado)
export interface Pokemon {
    id: number;
    name: string;
    imageUrl: string;
}

// 1. Definir o tipo das Props que o componente espera
interface PokemonCardProps {
    pokemon: Pokemon; // Espera um objeto 'pokemon' do tipo 'Pokemon'
}


// 2. Receber o objeto 'pokemon' via destructuring nas props
const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    return (
        <div 
            // A chave (key) deve ser usada no elemento PAI que está fazendo o map,
            // mas mantemos aqui para referência se for o caso de um Server Component wrapper.
            // Para um componente puro, a key é passada no map.
            // Aqui, usamos o id para garantir que a imagem tenha um identificador único.
            style={{ 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                padding: '15px', 
                textAlign: 'center',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.1)'
            }}
        >
            <Image
                src={pokemon.imageUrl}
                alt={`Sprite de ${pokemon.name}`}
                width={96} // Tamanho padrão da imagem do sprite
                height={96}
                // priority: Geralmente definido apenas para imagens Above The Fold (no topo da página).
                // Como este será um de N cards, vamos remover o 'priority' para evitar erros de desempenho.
                style={{ imageRendering: 'pixelated' }} // Deixa o sprite mais nítido
            />
            <p style={{ margin: '10px 0 0', fontWeight: 'bold' }}>
                #{pokemon.id} {pokemon.name.toUpperCase()}
            </p>
        </div>
    );
};

export default PokemonCard;