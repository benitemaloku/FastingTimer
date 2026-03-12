import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  const currentLang = i18n.language.startsWith("al") ? "al" : "en";

  const active =
    location.pathname === "/dua"
      ? "dua"
      : location.hash === "#location"
      ? "location"
      : "home";

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const navClass = (name) =>
    `px-4 py-1.5 rounded-full text-sm font-semibold transition duration-300 ${
      active === name
        ? "bg-white/15 text-white"
        : "text-white/70 hover:bg-white/15 hover:text-white"
    }`;

  const langClass = (lang) =>
  `px-3 py-1.5 text-sm font-semibold transition ${
    currentLang === lang
      ? "text-white underline decoration-2 underline-offset-4"
      : "text-white/70 hover:text-white"
  }`;

  return (
    <div className="fixed top-3 w-full z-20 flex justify-center items-center px-2">
<nav className="flex items-center gap-2 p-1.5 border border-white/15 rounded-full bg-white/10 backdrop-blur">

  <a href="/#home" className={navClass("home")}>
    Home
  </a>

  <a href="/#location" className={navClass("location")}>
    Times
  </a>

  <span className="h-4 w-px bg-white/20 mx-1"></span>

  <button
    type="button"
    onClick={() => changeLanguage("al")}
    className={langClass("al")}
  >
    AL
  </button>

  <button
    type="button"
    onClick={() => changeLanguage("en")}
    className={langClass("en")}
  >
    EN
  </button>

</nav>
    </div>
  );
};