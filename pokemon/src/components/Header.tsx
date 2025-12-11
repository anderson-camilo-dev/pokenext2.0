// src/components/Header.tsx

import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ 
      backgroundColor: '#CC0000', // Vermelho Pokémon
      color: 'white',
      padding: '15px 40px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <Link href="/" style={{ 
        color: 'white', 
        textDecoration: 'none', 
        fontSize: '1.8rem', 
        fontWeight: 'bold',
        textShadow: '1px 1px 2px #000',
      }}>
        🔥 Meu Pokédex
      </Link>
      <nav>
        <Link href="/" style={{ color: 'white', textDecoration: 'none', marginLeft: '25px', fontSize: '1.1rem' }}>
          Início
        </Link>
        {/* Você pode adicionar mais links aqui, como "Sobre" ou "Contato" */}
      </nav>
    </header>
  );
}