import React, { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {useSignOut} from 'react-firebase-hooks/auth'
import { app, auth } from "../firebase";
interface HeaderProps {
  search: (event: React.FormEvent<HTMLInputElement>) => void;
}

const Header: FC<HeaderProps> = ({ search }) => {
  const [lang, setLang] = useState("en");
  const [signOut] = useSignOut(auth)

  const { t, i18n } = useTranslation();
  const changeLanguage = () => {
    if (lang === "en") {
      setLang("hr");
    } else {
      setLang("en");
    }
  };
  const logout = async () => {
    await signOut();
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
