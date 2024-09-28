import React from "react";
import Logo from "../atoms/Logo";
import NavLink from "../atoms/NavLink";

const Navbar: React.FC = () => (
  <nav className="bg-yellow-400 p-4 w-full flex justify-between items-center">
    <Logo />
    <NavLink href="/products">Products</NavLink>
  </nav>
);

export default Navbar;
