import React, { FC, useState, useEffect } from 'react';
import { useTranslation, UseTranslationResponse } from 'react-i18next';

interface HeaderProps {
  search: (event: React.FormEvent<HTMLInputElement>) => void;
}

const Header: FC<HeaderProps> = ({ search }) => {
  const [lang, setLang] = useState('en');
  const { t, i18n }: UseTranslationResponse = useTranslation();
  const changeLanguage = () => {
    if (lang === 'en') {
      setLang('hr');
    } else {
      setLang('en');
    }
  };
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  return (
    <header className="header">
      <div className="header__title">{t('headerTitle')}</div>
      <div className="header__search">
        <input type="search" placeholder={t('searchText')} onChange={search} />
      </div>
      <span onClick={changeLanguage} className="language">
        {t('lng')}
      </span>
    </header>
  );
};

export default Header;
