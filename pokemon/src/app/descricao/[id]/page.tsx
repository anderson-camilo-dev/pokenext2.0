// ./app/descricao/[id]/page.tsx
import PokemonDetailClient from '../../components/PokemonDetailClient';

interface Params {
  params: { id: string };
}

interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    animated?: string | null;
    animated_shiny?: string | null;
  };
}

async function fetchPokemon(id: string): Promise<PokemonData | null> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { next: { revalidate: 86400 } });
    if (!res.ok) return null;

    const data = await res.json();

    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      types: data.types,
      sprites: {
        front_default: data.sprites.front_default,
        front_shiny: data.sprites.front_shiny,
        animated: data.sprites.versions['generation-v']['black-white'].animated.front_default,
        animated_shiny: data.sprites.versions['generation-v']['black-white'].animated.front_shiny,
      },
    };
  } catch (error) {
    console.error('Erro ao buscar Pokémon:', error);
    return null;
  }
}

export default async function PokemonDetailPage({ params }: Params) {
  const pokemon = await fetchPokemon(params.id);

  if (!pokemon)
    return <p className="text-red-500 text-center mt-10">Pokémon não encontrado.</p>;

  return <PokemonDetailClient pokemon={pokemon} />;
}
