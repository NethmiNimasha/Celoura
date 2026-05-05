import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-green-700 text-white">
      <div className="flex items-center gap-3">
        <img
          src={`${process.env.PUBLIC_URL}/tailoria.png`}
          alt="Tailoria logo"
          className="h-8 w-8 object-contain"
        />
        <h1 className="text-2xl font-bold leading-none">Tailoria</h1>
      </div>

      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/login">Sign In</Link>
        <Link to="/register">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;