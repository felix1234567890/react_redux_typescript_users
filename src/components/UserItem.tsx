import React, { FC } from 'react';
import { useTranslation, UseTranslationResponse } from 'react-i18next';

export type User = {
  name: string;
  email: string;
  country: string;
  photo: string;
  gender: string;
  age: number;
};

interface UserItemProps {
  user: User;
}

const UserItem: FC<UserItemProps> = ({ user: { name, email, photo, country, gender, age } }) => {
  const { t }: UseTranslationResponse = useTranslation();
  return (
    <article className="card">
      <img src={photo} alt="user avatar" />
      <h3 className="user__name">{name}</h3>
      <div className="user__details">
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>{t('country')}:</strong> {country}
        </p>
        <p>
          <strong>{t('gender')}:</strong> {gender}
        </p>
        <p>
          <strong>{t('age')}:</strong> {age}
        </p>
      </div>
    </article>
  );
};

export default UserItem;
