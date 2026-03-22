import Link from "next/link";
import Container from "@/components/ui/Container";
import NavDropdown from "./NavDropdown";
import MobileMenu from "./MobileMenu";
import { navItems } from "@/data/navigation";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <Container>
        <div className="flex items-center justify-between h-[72px]">
          {/* Sol: Logo */}
          <Link href="/" className="flex items-center gap-0.5">
            <span className="font-heading text-3xl font-bold text-text-primary">Craw</span>
            <span className="font-heading text-3xl font-light text-terracotta-400">Agency</span>
          </Link>

          {/* Orta: Nav pill — liquid glass */}
          <nav className="hidden lg:flex items-center gap-6 px-10 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-2xl border border-white/[0.06]">
            {navItems.map((item) =>
              item.dropdown ? (
                <NavDropdown key={item.label} label={item.label} items={item.dropdown} />
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors font-medium text-[13px] tracking-wide"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Sağ: Teklif Al — ayrı buton */}
          <Link
            href="/iletisim"
            className="hidden lg:inline-flex items-center px-5 py-1.5 rounded-full text-[13px] font-medium tracking-wide border border-white/[0.08] text-white/70 hover:text-white hover:border-white/20 transition-all"
          >
            Teklif Al
          </Link>

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
