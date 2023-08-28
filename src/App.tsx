import React, { useState, useEffect, FC } from "react";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import "./App.scss";
import UsersList from "./components/UsersList";
import Filters from "./components/Filters";
import { connect } from "react-redux";
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
import { SingleValue } from "react-select";
import { getDatabase, ref } from "firebase/database";
import { app } from "./firebase";
import { useListVals } from "react-firebase-hooks/database";
import { User } from "./components/UserItem";
const database = getDatabase(app);
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
  loading: loader,
  sortedUsers,
}) => {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageNumber: 1,
    itemsPerPage: 6,
    pageCount: null,
  });

  const [sortOrder, setSortOrder] = useState<{value:string, label:string}>({ value: "", label: "None" });
  const [values, loading] = useListVals<User>(ref(database, "users"));
console.log(values)
  useEffect(() => {
    thunkloadUsers(values!);
  }, [values]);

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

  const handleSortByAge = (srtOrder: SingleValue<Option>) => {
    setSortOrder(srtOrder!);
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
      {loading && <span>List: Loading...</span>}
      {!!values!.length && (
        <>
          <Header search={handleSearch} />
          <Filters sort={handleSortByAge} sortOrder={sortOrder} />
          <UsersList users={shownUsers!} loading={loader!} />
          <Pagination
            pageCount={paginationState.pageCount!}
            pageNumber={paginationState.pageNumber}
            increaseNumber={increaseNumber}
            decreaseNumber={decreaseNumber}
          />
        </>
      )}
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
