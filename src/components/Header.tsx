import React, { FC, useState, useEffect } from "react";
import { useTranslation, UseTranslationResponse } from "react-i18next";
import { useFirebase } from "react-redux-firebase";

interface HeaderProps {
  search: (event: React.FormEvent<HTMLInputElement>) => void;
}

const Header: FC<HeaderProps> = ({ search }) => {
  const [lang, setLang] = useState("en");
  const firebase = useFirebase();

  const { t, i18n }: UseTranslationResponse = useTranslation();
  const changeLanguage = () => {
    if (lang === "en") {
      setLang("hr");
    } else {
      setLang("en");
    }
  };
  const logout = async () => {
    await firebase.logout();
  };
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  return (
    <header className="header">
      <div className="header__title">{t("headerTitle")}</div>
      <div className="header__search">
        <input type="search" placeholder={t("searchText")} onChange={search} />
      </div>
      <span onClick={changeLanguage} className="language">
        {t("lng")}
      </span>
      <button className="logout" onClick={logout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
