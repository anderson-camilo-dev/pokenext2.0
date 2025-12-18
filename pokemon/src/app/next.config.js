/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'], // PokéAPI usa este domínio para sprites
  },
};

module.exports = nextConfig;
