import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const { i18n } = useTranslation();
  const [theme, setTheme] = useState("light");

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <header className="flex items-center justify-between border-b p-4">
      <div className="logo">Logo</div>
      <nav>
        <Link to="/" className="mx-2">
          Home
        </Link>
      </nav>
      <div className="flex items-center">
        <button onClick={() => changeLanguage("en")} className="mx-2">
          EN
        </button>
        <button onClick={() => changeLanguage("ka")} className="mx-2">
          KA
        </button>
        <Link className="mx-2" to="/login">
          Login
        </Link>
        <Link className="mx-2" to="/register">
          Register
        </Link>
        <button onClick={toggleTheme} className="mx-2">
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </header>
  );
}

export default Header;
