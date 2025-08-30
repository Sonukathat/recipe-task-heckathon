import { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <h1 className="font-bold text-2xl text-white tracking-wide">
            🍲 Recipe App
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 text-white font-medium">
            <Link to="/dashboard" className="hover:text-yellow-300 transition">
              Dashboard
            </Link>
            <Link to="/feed" className="hover:text-yellow-300 transition">
              Public Feed
            </Link>
            <Link to="/" className="hover:text-yellow-300 transition">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-yellow-400 text-black px-3 py-1 rounded-lg hover:bg-yellow-300 transition"
            >
              Signup
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white text-3xl"
          >
            {menuOpen ? <IoClose /> : <GiHamburgerMenu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="flex flex-col gap-4 pb-4 text-white font-medium md:hidden">
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-300 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/feed"
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-300 transition"
            >
              Public Feed
            </Link>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-300 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="bg-yellow-400 text-black px-3 py-1 rounded-lg hover:bg-yellow-300 transition w-fit"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
