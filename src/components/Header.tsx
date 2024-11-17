import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

function Header() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <header className="flex items-center justify-between border-b p-4">
      <div className="logo">{t("logo")}</div>
      <nav>
        <Link to="/" className="mx-2">
          {t("home")}
        </Link>
      </nav>
      <div className="flex items-center">
        <Select onValueChange={changeLanguage}>
          <SelectTrigger className="mx-2">
            <SelectValue placeholder={t("language")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">{t("english")}</SelectItem>
            <SelectItem value="ka">{t("georgian")}</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={toggleTheme}>
          <SelectTrigger className="mx-2">
            <SelectValue placeholder={t("theme")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">{t("lightMode")}</SelectItem>
            <SelectItem value="dark">{t("darkMode")}</SelectItem>
          </SelectContent>
        </Select>
        <Link className="mx-2" to="/login">
          {t("login")}
        </Link>
        <Link className="mx-2" to="/register">
          {t("register")}
        </Link>
      </div>
    </header>
  );
}

export default Header;
