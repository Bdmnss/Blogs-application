import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom, filterAtom, languageAtom } from "@/store/atoms";
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
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { supabase } from "@/supabase";
import { AppRouteEnums } from "@/routes/AppRouteEnums";

function Header() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useAtom(userAtom);
  const [, setFilter] = useAtom(filterAtom);
  const [, setLanguage] = useAtom(languageAtom);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem("user");
    navigate(AppRouteEnums.LOGIN);
  };

  const avatarSvg = user?.avatar_url
    ? user.avatar_url
    : `data:image/svg+xml;utf8,${encodeURIComponent(createAvatar(lorelei, { seed: "felix" }).toString())}`;

  const handleNavigateHome = () => {
    setFilter("");
    navigate(AppRouteEnums.HOME);
  };

  return (
    <header className="flex items-center justify-between border-b bg-[var(--bg-color)] p-4 text-[var(--text-color)]">
      <Link
        to={AppRouteEnums.HOME}
        className="cursor-pointer"
        onClick={handleNavigateHome}
      >
        {t("logo")}
      </Link>
      <nav>
        <Link
          to={AppRouteEnums.HOME}
          className="mx-2 cursor-pointer"
          onClick={handleNavigateHome}
        >
          {t("home")}
        </Link>
        <Link to={AppRouteEnums.ABOUT} className="mx-2 cursor-pointer">
          {t("about")}
        </Link>
      </nav>
      <div className="flex items-center">
        <Select onValueChange={changeLanguage}>
          <SelectTrigger className="mx-2">
            <SelectValue placeholder={t("language")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="cursor-pointer" value="en">
              {t("english")}
            </SelectItem>
            <SelectItem className="cursor-pointer" value="ka">
              {t("georgian")}
            </SelectItem>
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
              <DropdownMenuRadioItem className="cursor-pointer" value="light">
                {t("lightMode")}
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem className="cursor-pointer" value="dark">
                {t("darkMode")}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="mx-2">
              <button className="overflow-hidden rounded-full bg-[var(--tag-bg-color)] p-1">
                <img
                  src={avatarSvg}
                  alt="avatar"
                  className="h-8 w-20 rounded-full"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={() => navigate(AppRouteEnums.PROFILE)}
              >
                {t("profile")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={handleLogout}
              >
                {t("logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link className="mx-2" to={AppRouteEnums.LOGIN}>
              {t("login")}
            </Link>
            <Link className="mx-2" to={AppRouteEnums.REGISTER}>
              {t("register")}
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
