import {
  LOAD_USERS,
  SET_LOADING,
  SET_SHOWN_USERS,
  SET_SORTED_USERS,
} from "./actionTypes";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "../reducers/userReducer";
import { User } from "../../components/UserItem";
import { UserActionTypes } from "./userActionInterfaces";
import { AppState } from "../reducers";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

const shuffleUsers = (users: User[]): void => {
  for (let i = users.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [users[i], users[j]] = [users[j], users[i]];
  }
};
const loadUsers = (users: User[]): UserActionTypes => {
  return {
    type: LOAD_USERS,
    payload: users,
  };
};
const setLoading = (loading: boolean): UserActionTypes => {
  return {
    type: SET_LOADING,
    payload: loading,
  };
};
export const thunkloadUsers =
  (users: User[]): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    shuffleUsers(users);
    dispatch(loadUsers(users));
    dispatch(paginateUsers());
    dispatch(setLoading(false));
  };
export const paginateUsers =
  (pageNumber = 1, itemsPerPage = 6): AppThunk =>
  (dispatch, getState:()=>AppState) => {
    const skip = (pageNumber - 1) * itemsPerPage;
    console.log(getState())
    const sortedUsers = getState().user.sortedUsers;
    if (sortedUsers.length > 0) {
      const shownUsers = sortedUsers.slice(skip, skip + itemsPerPage);
      dispatch(setShownUsers(shownUsers));
    }
  };
const setShownUsers = (users: User[]): UserActionTypes => {
  return {
    type: SET_SHOWN_USERS,
    payload: users,
  };
};

export const filterUsers =
  (text: string): AppThunk =>
  (dispatch, getState) => {
    const filteredUsers = getState().user.users.filter((user: User) => {
      if (user.country.toLowerCase().startsWith(text.toLowerCase()))
        return true;
      return false;
    });
    filteredUsers.sort((a, b) => (a.country > b.country ? 1 : -1));
    dispatch(setSortedUsers(filteredUsers));
    dispatch(paginateUsers());
  };
const setSortedUsers = (users: User[]): UserActionTypes => {
  return {
    type: SET_SORTED_USERS,
    payload: users,
  };
};
export const sortUsers =
  (sortOrder: string): AppThunk =>
  (dispatch, getState) => {
    const users = getState().user.users;
    if (users.length === 0) return;
    let sortedUsers:User[]
    switch (sortOrder) {
      case "desc":
        sortedUsers = users.sort((a: User, b: User) => {
          return b.age - a.age;
        });
        break;
      case "asc":
        sortedUsers = users.sort((a: User, b: User) => {
          return a.age - b.age;
        });
        break;
      case "under40":
        sortedUsers = users
          .filter((user: User) => user.age < 40)
          .sort((a: User, b: User) => a.age - b.age);
        break;
      case "over40":
        sortedUsers = users
          .filter((user: User) => user.age > 40)
          .sort((a: User, b: User) => a.age - b.age);
        break;
      case "female":
        sortedUsers = users.filter((user: User) => user.gender === "female");
        break;
      case "male":
        sortedUsers = users.filter((user: User) => user.gender === "male");
        break;
      default:
        sortedUsers = users;
    }
    dispatch(setSortedUsers(sortedUsers));
    dispatch(paginateUsers());
  };
