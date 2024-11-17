import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Header() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="flex items-center justify-between border-b p-4">
      <div className="logo">Logo</div>
      <nav>
        <Link to="/" className="mx-2">
          {t("home")}
        </Link>
      </nav>
      <div className="flex items-center">
        <button onClick={() => changeLanguage("en")} className="mx-2">
          EN
        </button>
        <button onClick={() => changeLanguage("ka")} className="mx-2">
          KA
        </button>
        <Link className="mx-2" to={"/login"}>
          Login
        </Link>
        <Link className="mx-2" to={"/register"}>
          Register
        </Link>
      </div>
    </header>
  );
}

export default Header;
