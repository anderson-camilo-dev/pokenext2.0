//import Header from '@/components/Header'; // Ajuste o caminho se sua estrutura for diferente
//import Footer from '@/components/Footer'; // Ajuste o caminho se sua estrutura for diferente
import React from 'react'; // Recomendado para tipagem
import "./globals.css"; // Importa estilos globais
import Header from './components/Header';
import Footer from './components/Footer';
export const metadata = {
  title: 'Meu Pokédex em Next.js', // Título mais relevante para o projeto
  description: 'Um projeto de estudo consumindo a PokeAPI.',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // 1. Alterar a língua para Português (pt-BR)
    <html lang="pt-BR">
      <body style={{ 
        margin: 0, 
        padding: 0, 
        // 4. Estilos para garantir que o Footer fique no final (Sticky Footer Pattern)
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
      }}>
        {/* 2. INÍCIO DO LAYOUT */}
        
       
        {/* O <main> envolve o conteúdo da página e usa flexGrow para ocupar o espaço restante */}
        <Header />
        <main className='bg-[url("/fundo.jpg")] bg-no-repeat bg-center bg-fixed bg-cover '>
            {children} {/* Seu src/app/page.tsx vai aqui */}
       <div>
        <Footer/>
       </div>

        </main>
       
       
        
        {/* 3. FIM DO LAYOUT */}
       
      </body>
      
    </html>
  )
}