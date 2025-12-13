export default function Footer() {
  // Pega o ano atual para o copyright
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="text-center border-t-2 borde-write/10 p-7 mt-7 bg-black text-white shadow-2xl shadow-black">
        <p>&copy; {currentYear} Meu Pokédex. Todos os direitos reservados.</p>
        <p>Dados fornecidos pela PokeAPI. Este é um projeto de estudo.</p>
        <a href="https://github.com/anderson-camilo-dev">Contato</a>
      </div>
    </>
  );
}
