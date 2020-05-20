import { User } from '../../components/UserItem';
import { UserActionTypes } from '../actions/userActionInterfaces';
import { LOAD_USERS, SET_LOADING, SET_SHOWN_USERS, SET_SORTED_USERS } from '../actions/actionTypes';

export interface RootState {
  users: Array<User>;
  sortedUsers: Array<User>;
  shownUsers: Array<User>;
  loading: boolean;
}

const initialState: RootState = {
  users: [],
  shownUsers: [],
  sortedUsers: [],
  loading: false,
};
export function userReducer(state = initialState, action: UserActionTypes): RootState {
  switch (action.type) {
    case LOAD_USERS:
      return {
        ...state,
        users: action.payload,
        sortedUsers: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_SHOWN_USERS:
      return {
        ...state,
        shownUsers: action.payload,
      };
    case SET_SORTED_USERS:
      return {
        ...state,
        sortedUsers: action.payload,
      };
    default:
      return initialState;
  }
}
