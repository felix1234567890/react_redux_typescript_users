import React, { FC } from "react";
import Select, {
  ControlProps,
  CSSObjectWithLabel,
  MenuListProps,
  MenuPosition,
  SingleValue,
} from "react-select";
import { useTranslation } from "react-i18next";

export type Option = {
  value: string;
  label: string;
};
interface FiltersProps {
  sort: (sortOrder: SingleValue<Option>) => void;
  sortOrder: Option;
}

const Filters: FC<FiltersProps> = ({ sort, sortOrder }) => {
  const { t } = useTranslation();
  const options = [
    { value: "", label: t("none") },
    { value: "asc", label: t("ageAsc") },
    { value: "desc", label: t("ageDesc") },
    { value: "under40", label: t("ageUnder") },
    { value: "over40", label: t("ageOver") },
    { value: "male", label: t("male") },
    { value: "female", label: t("female") },
  ];

  return (
    <div className="sortBy">
      <span>{t("sortBy")} </span>
      <Select
        isSearchable={false}
        styles={customStyles}
        defaultValue={options[0]}
        value={sortOrder}
        onChange={sort}
        options={options}
      />
    </div>
  );
};
const customStyles = {
  menuList: (styles) => ({
    ...styles,
    color: "#ffffff",
    borderRadius: "0px 0px 6px 6px",
    overflow: "hidden",
    border: "1px solid #566273",
    position: "absolute",
    backgroundColor: "#212a38",
    left: 0,
    right: 0,
  }),
  control: (styles) => ({
    ...styles,
    position: "relative",
    width: "100%",
    textAlign: "left",
    outline: "",
    height: "47px",
    marginTop: "1rem",
  }),

  indicatorsContainer: (styles) => ({
    ...styles,
    marginLeft: "auto",
    height: "100%",
    marginTop: 0,
  }),
  singleValue: (styles) => ({
    ...styles,
    fontWeight: 500,
    paddingLeft: "8px",
    cursor: "pointer",
    userSelect: "none",
  }),
  option: (styles) => ({
    ...styles,
    ":hover": {
      backgroundColor: "purple",
    },
  }),
};
export default Filters;
