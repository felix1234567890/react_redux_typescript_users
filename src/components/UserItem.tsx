import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import editIcon from "../../public/images/edit.png";
import Modal from "react-modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { ref, getDatabase } from "firebase/database";
import { app } from "../firebase";
import { useObject, useObjectVal } from "react-firebase-hooks/database";

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
  country: yup
    .string()
    .required("Country is required")
    .min(2, "Country must have at least 2 letters"),
  age: yup
    .number()
    .positive()
    .integer("This is not number")
    .required("Age is required"),
  gender: yup
    .mixed()
    .oneOf(["male", "female", "other"] as const)
    .defined(),
});

const UserItem: FC<UserItemProps> = ({
  user: { name, email, photo, country, gender, age },
}) => {
  const [data, setData] = useState<Omit<User, "photo">>({
    age,
    name,
    email,
    country,
    gender,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const database = getDatabase(app);
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const [value, loading, error] = useObjectVal(ref(database, "users/"))
  const onSubmit = async (data) => {
    setData(data);
    toggleModal();
  };
  const { t } = useTranslation();
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Edit user</h2>
          <div className="form-group">
            <label htmlFor="">Name</label>
            <input
              {...register("name")}
              type="text"
              name="name"
              defaultValue={data.name}
              placeholder="Name"
            />
          </div>
          <p className="error">{errors.name?.message}</p>
          <div className="form-group">
            <label htmlFor="">Country</label>
            <input
              {...register("country")}
              type="text"
              name="country"
              defaultValue={data.country}
              placeholder="Country"
            />
          </div>
          <p className="error">{errors.country?.message}</p>
          <div className="form-group">
            <label htmlFor="">Gender</label>
            <select defaultValue={data.gender} {...register("gender")}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="">Age</label>
            <input
              {...register("age")}
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
