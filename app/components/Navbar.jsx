"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full flex gap-4 sm:gap-6 px-4 sm:px-6 md:px-10 py-3 sm:py-4 bg-slate-800 text-white">
      <Link href="/" className="text-base sm:text-lg md:text-xl font-semibold hover:underline">
        Home
      </Link>
      <Link href="/CollectionPage" className="text-base sm:text-lg md:text-xl font-semibold hover:underline">
        Collection
      </Link>
    </nav>
  );
};

export default Navbar;
