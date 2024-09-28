import React from "react";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <Link href={href} legacyBehavior>
    <a className="text-black font-semibold mr-3">{children}</a>
  </Link>
);

export default NavLink;
