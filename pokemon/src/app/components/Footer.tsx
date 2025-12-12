export default function Footer() {
  // Pega o ano atual para o copyright
  const currentYear = new Date().getFullYear(); 

  return (
    <footer style={{
      backgroundColor: '#333',
      color: '#fff',
      padding: '20px 40px',
      textAlign: 'center',
      borderTop: '5px solid #005A9C', // Azul complementar
      marginTop: '40px', // Espaço após o conteúdo principal
    }}>
      <p style={{ margin: '5px 0' }}>
        &copy; {currentYear} Meu Pokédex. Todos os direitos reservados.
      </p>
      <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>
        Dados fornecidos pela PokeAPI. Este é um projeto de estudo.
      </p>
      <a 
        href="mailto:contato@exemplo.com" 
        style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.9rem' }}
      >
        Contato
      </a>
    </footer>
  );
}