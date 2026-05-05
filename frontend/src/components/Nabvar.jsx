import { NavLink, Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-lg shadow-emerald-200">
            <span className="text-xl">✂</span>
          </div>
          <div>
            <p className="text-lg font-black tracking-tight text-slate-900">Tailoria</p>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Tailor orders</p>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={({ isActive }) => `text-sm font-medium transition ${isActive ? "text-teal-700" : "text-slate-600 hover:text-slate-900"}`}>
            Home
          </NavLink>
          <NavLink to="/orders" className={({ isActive }) => `text-sm font-medium transition ${isActive ? "text-teal-700" : "text-slate-600 hover:text-slate-900"}`}>
            New Order
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => `text-sm font-medium transition ${isActive ? "text-teal-700" : "text-slate-600 hover:text-slate-900"}`}>
            Dashboard
          </NavLink>
          <NavLink to="/admin" className={({ isActive }) => `text-sm font-medium transition ${isActive ? "text-teal-700" : "text-slate-600 hover:text-slate-900"}`}>
            Admin
          </NavLink>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/signin"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-teal-200 hover:text-teal-700"
          >
            Sign In
          </Link>
          <Link
            to="/orders"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-teal-600"
          >
            Place Order
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;