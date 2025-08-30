import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between bg-blue-600 p-4 text-white">
      <h1 className="font-bold text-xl">🍲 Recipe App</h1>
      <div className="flex gap-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/feed">Public Feed</Link>
        <Link to="/">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
}

export default Navbar;
