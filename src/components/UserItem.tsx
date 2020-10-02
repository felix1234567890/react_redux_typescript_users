import React, { FC, useState } from "react";
import { useTranslation, UseTranslationResponse } from "react-i18next";
import editIcon from "../images/edit.png";
import Modal from "react-modal";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm } from "react-hook-form";

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
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must have at least 2 letters"),
  email: yup
    .string()
    .required("Email is required")
    .email("This is not valid email"),
  country: yup
    .string()
    .required("Country is required")
    .min(2, "Country must have at least 2 letters"),
  age: yup.number().positive().integer().required(),
});

const UserItem: FC<UserItemProps> = ({
  user: { name, email, photo, country, gender, age },
}) => {
  const [data, setData] = useState({
    age,
    name,
    email,
    country,
    gender,
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const { t }: UseTranslationResponse = useTranslation();
  const onChange = (event) => {
    setData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <article className="card">
      <img src={photo} alt="user avatar" />
      <h3 className="user__name">{name}</h3>
      <div className="user__details">
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>{t("country")}:</strong> {country}
        </p>
        <p>
          <strong>{t("gender")}:</strong> {gender}
        </p>
        <p>
          <strong>{t("age")}:</strong> {age}
        </p>
      </div>
      <div className="edit">
        <img src={editIcon} alt="Edit" onClick={() => setIsOpen(true)} />
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="modal"
        overlayClassName="overlay"
        closeTimeoutMS={500}
        ariaHideApp={false}
      >
        <form>
          <h2>Edit user</h2>
          <div className="form-group">
            <label htmlFor="">Name</label>
            <input
              ref={register}
              type="text"
              name="name"
              defaultValue={data.name}
              placeholder="Name"
            />
          </div>
          <p className="error">{errors.name?.message}</p>
          <div className="form-group">
            <label htmlFor="">Email</label>
            <input
              ref={register}
              type="text"
              name="email"
              defaultValue={data.email}
              placeholder="Email"
            />
          </div>
          <p className="error">{errors.email?.message}</p>
          <div className="form-group">
            <label htmlFor="">Country</label>
            <input
              ref={register}
              type="text"
              name="country"
              defaultValue={data.country}
              placeholder="Country"
            />
          </div>
          <p className="error">{errors.country?.message}</p>
          <div className="form-group">
            <label htmlFor="">Gender</label>
            <select name="gender" defaultValue={data.gender} ref={register}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="">Age</label>
            <input
              ref={register}
              type="number"
              name="age"
              defaultValue={data.age}
              placeholder="Age"
            />
          </div>
          <p className="error">{errors.age?.message}</p>
          <button type="submit">Save</button>
        </form>
      </Modal>
    </article>
  );
};

export default UserItem;
