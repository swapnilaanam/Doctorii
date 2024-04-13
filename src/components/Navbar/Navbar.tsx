"use client"

import Link from 'next/link';
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from 'next/image';

import { RiMenu3Fill } from "react-icons/ri";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  }

  const session = useSession();
  const pathname = usePathname();

  const navItems = <>
    <li>
      <Link href="/" className={`${pathname === '/' ? 'text-yellow-300 text-xl uppercase font-bold' : 'text-white text-xl uppercase font-bold'}`}>
        Home
      </Link>
    </li>
    <li>
      <Link href="/doctors" className={`${pathname === '/doctors' ? 'text-yellow-300 text-xl uppercase font-bold' : 'text-white text-xl uppercase font-bold'}`}>
        Doctors
      </Link>
    </li>
    <li>
      <Link href="/diagnosis" className={`${pathname === '/diagnosis' ? 'text-yellow-300 text-xl uppercase font-bold' : 'text-white text-xl uppercase font-bold'}`}>
        Diagnosis
      </Link>
    </li>
    <li>
      <Link href="/dashboard" className={`${pathname === '/dashboard' ? 'text-yellow-300 text-xl uppercase font-bold' : 'text-white text-xl uppercase font-bold'}`}>
        Dashboard
      </Link>
    </li>
    {
      session.status === 'authenticated' ? (
        <>
          <li className="relative">
            <div className="relative w-12 h-12 hover:cursor-pointer">
              <Image onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} fill={true} src={session?.data?.user?.image} alt="Profile Picture" className='w-full h-full object-cover rounded-full' />
            </div>
            {
              isHover && (
                <div className="bg-green-600 absolute top-16 -left-16 w-56 px-5 py-2 text-lg font-medium rounded text-center shadow-xl">
                  {session?.data?.user?.name}
                </div>
              )
            }
          </li>
          <li>
            <button onClick={() => signOut()} className="bg-yellow-400 px-7 py-2 rounded text-lg text-black font-bold uppercase">Logout</button>
          </li>
        </>
      ) : (
        <li>
          <Link href="/login" className={`${pathname === '/login' ? 'text-yellow-400 text-xl font-bold uppercase' : 'text-xl font-bold uppercase'}`}>
            Login
          </Link>
        </li>
      )
    }

  </>

  return (
    <nav className="bg-sky-600 text-white w-full p-8 flex flex-col md:flex-row justify-between items-center gap-5 md:gap-0">
      <div className="w-full flex justify-between items-center">
        <Link href="/">
          <h1 className="text-3xl font-bold">Doctorii</h1>
        </Link>
        <RiMenu3Fill onClick={() => setIsOpen(!isOpen)} className="text-2xl font-bold md:hidden" />
      </div>
      <ul className="hidden md:flex flex-col md:flex-row justify-center items-center gap-7">
            {navItems}
      </ul>
      {
        isOpen && (
          <ul className="md:hidden mt-2 flex flex-col md:flex-row justify-center items-center gap-7">
            {navItems}
          </ul>
        )
      }
    </nav>
  );
};

export default Navbar;