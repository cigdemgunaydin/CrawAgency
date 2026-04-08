"use client";

import Link from "next/link";
import NavDropdown from "./NavDropdown";
import MobileMenu from "./MobileMenu";
import { navItems } from "@/data/navigation";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 10;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 lg:px-8 pt-4">
      <div
        className={cn(
          "flex items-center justify-between w-full max-w-7xl px-8 py-2.5 rounded-[28px] transition-all duration-500",
          isScrolled
            ? "bg-white/[0.06] backdrop-blur-2xl shadow-navbar"
            : "bg-transparent"
        )}
      >
        {/* Sol: Logo */}
        <Link href="/" className="flex items-center gap-0.5">
          <span className="font-heading text-4xl font-bold text-text-primary">Craw</span>
          <span className="font-heading text-4xl font-light text-terracotta-400">Agency</span>
        </Link>

        {/* Orta: Nav linkleri */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) =>
            item.dropdown ? (
              <NavDropdown key={item.label} label={item.label} items={item.dropdown} />
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-400 hover:text-white transition-colors font-medium text-[15px] tracking-wide"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Sağ: Teklif Al */}
        <Link
          href="/iletisim"
          className={cn(
            "hidden lg:inline-flex items-center px-6 py-2 rounded-full text-[15px] font-medium tracking-wide transition-all duration-300",
            isScrolled
              ? "bg-terracotta-400 text-white hover:bg-terracotta-500 border border-transparent"
              : "border border-white/[0.08] text-white/70 hover:text-white hover:border-white/20"
          )}
        >
          Teklif Al
        </Link>

        <MobileMenu />
      </div>
    </header>
  );
}
