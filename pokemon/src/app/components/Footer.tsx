export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Sombra */}
      <div className="h-60 bg-gradient-to-t  from-black " />

   
      <footer className="bg-black text-gray-300   px-8 py-15 text-center from-black ">


        <p className="text-3xl font-light tracking-widest  ">
          © {currentYear} MEU POKÉDEX
        </p>

        <p className="text-2x2 tracking-wide leading-relaxed max-w-xl mx-auto">
          Dados fornecidos pela PokeAPI. Este é um projeto de estudo.
        </p>

        <a
          href="https://github.com/anderson-camilo-dev"
          className="mt-6 inline-block text-2xl uppercase tracking-[0.25em] text-gray-400 hover:text-white transition-colors"
        >
          Contato
        </a>
      </footer>
    </>
  );
}
