"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex gap-6 px-10 py-4 bg-slate-800 text-white">
      <Link href="/" className="text-xl font-semibold hover:underline">
        Home
      </Link>
      <Link href="/CollectionPage" className="text-xl font-semibold hover:underline">
        Collection
      </Link>
    </nav>
  );
};

export default Navbar;
