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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

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
    <header className="flex items-center justify-between border-b bg-[var(--bg-color)] p-4 text-[var(--text-color)]">
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
        <DropdownMenu>
          <DropdownMenuTrigger className="mx-2">
            <button className="rounded bg-[var(--tag-bg-color)] px-4 py-2 text-[var(--tag-text-color)]">
              {t("theme")}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={theme} onValueChange={toggleTheme}>
              <DropdownMenuRadioItem value="light">
                {t("lightMode")}
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark">
                {t("darkMode")}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
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
