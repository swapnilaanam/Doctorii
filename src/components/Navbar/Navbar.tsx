"use client"

import Link from 'next/link';
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  }

  const session = useSession();
  const pathname = usePathname();
  // console.log(session);

  const navItems = <>
    <li>
      <Link href="/" className={`${pathname === '/' ? 'text-yellow-300 text-2xl font-medium' : 'text-white text-2xl font-medium'}`}>
        Home
      </Link>
    </li>
    <li>
      <Link href="/doctors" className={`${pathname === '/doctors' ? 'text-yellow-300 text-2xl font-medium' : 'text-white text-2xl font-medium'}`}>
        Doctors
      </Link>
    </li>
    <li>
      <Link href="/diagnosis" className={`${pathname === '/diagnosis' ? 'text-yellow-300 text-2xl font-medium' : 'text-white text-2xl font-medium'}`}>
        Diagnosis
      </Link>
    </li>
    <li>
      <Link href="/dashboard" className={`${pathname === '/dashboard' ? 'text-yellow-300 text-2xl font-medium' : 'text-white text-2xl font-medium'}`}>
        Dashboard
      </Link>
    </li>
    {
      session.status === 'authenticated' ? (
        <>
          <li>
            <h2 className="ms-2 text-2xl text-yellow-300 font-bold">{session?.data?.user?.name?.split(" ")[0]}</h2>
          </li>
          <li>
            <button onClick={() => signOut()} className="bg-yellow-400 px-6 py-3 rounded text-2xl text-black font-medium">Logout</button>
          </li>
        </>
      ) : (
        <li>
          <Link href="/login" className={`${pathname === '/login' ? 'text-yellow-400 text-2xl font-medium' : 'text-2xl font-medium'}`}>
            Login
          </Link>
        </li>
      )
    }

  </>

  return (
    <nav className="bg-sky-500 text-white w-full ps-10 pe-14 py-8 flex flex-col md:flex-row justify-between items-center gap-5 md:gap-0">
      <div>
        <Link href="/">
          <h1 className="text-4xl font-semibold">Doctorii</h1>
        </Link>
      </div>
      <ul className="flex flex-col md:flex-row items-center gap-7">
        {navItems}
      </ul>
    </nav>
  );
};

export default Navbar;