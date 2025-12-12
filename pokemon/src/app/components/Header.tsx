 import Link from "next/link";
 export default function Header() {
  return (

    <header className="bg-black/50 shadow-md p-4 flex  border-b border-gray-200">
      <Link href="/">
        <h1 className='text-red-600  font-bold text-5xl mt-2.5 p-5'>Pokedex</h1>
     </Link>   
      
    </header>
  );
}

