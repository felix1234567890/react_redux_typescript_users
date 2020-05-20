import { LOAD_USERS, SET_LOADING, SET_SHOWN_USERS, SET_SORTED_USERS } from './actionTypes';
import { User } from '../../components/UserItem';

export interface LoadUsersAction {
  type: typeof LOAD_USERS;
  payload: User[];
}
export interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}
export interface SetShownUsersAction {
  type: typeof SET_SHOWN_USERS;
  payload: User[];
}
export interface SetSortedUsersAction {
  type: typeof SET_SORTED_USERS;
  payload: User[];
}
export type UserActionTypes = LoadUsersAction | SetLoadingAction | SetShownUsersAction | SetSortedUsersAction;
