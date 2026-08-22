"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const links = [["home", "/"], ["experience", "/experience"], ["projects", "/activity"], ["book 30 min", "/contact"]];

export default function SiteNav() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setIsScrolled(window.scrollY > 12); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <nav className={`site-nav${isScrolled ? " is-scrolled" : ""}`} aria-label="Main navigation"><Link className="nav-mark" href="/">cb_</Link><div>{links.map(([label, href]) => <Link key={href} href={href} className={pathname === href ? "is-active" : ""}>{label}</Link>)}</div></nav>;
}
