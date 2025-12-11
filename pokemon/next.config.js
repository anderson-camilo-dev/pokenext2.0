// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Propriedade de configuração das imagens
  images: {
    // Lista de domínios externos permitidos
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        // Opcional: Define que aceitamos qualquer caminho após /PokeAPI/sprites/
        pathname: '/PokeAPI/sprites/**', 
      },
    ],
  },
};

module.exports = nextConfig;