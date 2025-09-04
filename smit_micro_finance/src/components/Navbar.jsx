// Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    { to: "/register", label: "Register" },
    { to: "/login", label: "Login" },
  ];

  return (
    <header className="bg-gradient-to-r from-white-500 to-green-500 text-white py-6 shadow-md">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl sm:text-4xl font-bold text-black hover:text-white-200">
           Microfinance
        </Link>
        <nav className="flex flex-wrap gap-2 sm:gap-4">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
