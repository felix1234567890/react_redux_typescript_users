import React, { useState, useEffect, FC } from "react";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import "./App.scss";
import UsersList from "./components/UsersList";
import Filters from "./components/Filters";
import { connect, useSelector } from "react-redux";
import { RootState } from "./redux/reducers/userReducer";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { UserActionTypes } from "./redux/actions/userActionInterfaces";
import {
  thunkloadUsers,
  paginateUsers,
  filterUsers,
  sortUsers,
} from "./redux/actions/userActions";
import { AppState } from "./redux/reducers";
import { Option } from "./components/Filters";
import { ValueType } from "react-select";
import { useFirebase, useFirebaseConnect } from "react-redux-firebase";
import { User } from "./components/UserItem";

type PaginationState = {
  pageNumber: number;
  itemsPerPage: number;
  pageCount: number | null;
};
const App: FC<AppProps> = ({
  thunkloadUsers,
  paginateUsers,
  filterUsers,
  sortUsers,
  shownUsers,
  loading,
  sortedUsers,
}) => {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageNumber: 1,
    itemsPerPage: 6,
    pageCount: null,
  });

  const [sortOrder, setSortOrder] = useState<any>({ value: "", label: "None" });
  useFirebaseConnect("users");
  const users: User[] = useSelector((state: any) => state.firebase.data.users);
  useEffect(() => {
    if (Array.isArray(users)) {
      thunkloadUsers(users);
    }
  }, [thunkloadUsers, users]);

  useEffect(() => {
    if (sortedUsers.length > 0) {
      setPaginationState({
        ...paginationState,
        pageNumber: 1,
        pageCount: Math.ceil(sortedUsers.length / paginationState.itemsPerPage),
      });
    }
  }, [sortedUsers]);

  useEffect(() => {
    paginateUsers(paginationState.pageNumber);
  }, [paginationState.pageNumber]);

  useEffect(() => {
    sortUsers(sortOrder.value);
  }, [sortOrder, sortUsers]);

  const handleSortByAge = (srtOrder: ValueType<Option>) => {
    setSortOrder(srtOrder);
    setPaginationState((prevState) => ({
      ...prevState,
      pageNumber: 1,
    }));
  };
  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    filterUsers(event.currentTarget.value);
  };
  const increaseNumber = (): void => {
    setPaginationState((prevState) => ({
      ...paginationState,
      pageNumber: prevState.pageNumber + 1,
    }));
  };
  const decreaseNumber = (): void => {
    setPaginationState((prevState) => ({
      ...paginationState,
      pageNumber: prevState.pageNumber - 1,
    }));
  };

  return (
    <>
      <Header search={handleSearch} />
      <Filters sort={handleSortByAge} sortOrder={sortOrder} />
      <UsersList users={shownUsers!} loading={loading!} />
      <Pagination
        pageCount={paginationState.pageCount!}
        pageNumber={paginationState.pageNumber}
        increaseNumber={increaseNumber}
        decreaseNumber={decreaseNumber}
      />
    </>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, UserActionTypes>
) => {
  return bindActionCreators(
    { thunkloadUsers, paginateUsers, filterUsers, sortUsers },
    dispatch
  );
};
const mapStateToProps = (state: AppState) => ({
  sortedUsers: state.user.sortedUsers,
  shownUsers: state.user.shownUsers,
  loading: state.user.loading,
});
type AppProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(App);
