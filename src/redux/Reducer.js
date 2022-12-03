import * as actTypes from "./ActionType.js";

const INITIAL_STATE = {
  auth: {
    token: null,
    refresh_token: null,
    access_token: null,
    authLoading: false,
    authFailedMessage: null,
  },
  selectedID: null,
  attendance_data: null,
  email: null,
};

export const Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actTypes.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        auth: {
          refresh_token: action.payload.refresh_token,
          access_token: action.payload.access_token,
        },
      };
    case actTypes.STORE_ATTENDANCE_IN_REDXUX:
      return {
        ...state,
        attendance_data: action.payload,
      }
    case actTypes.SELECTED_ID:
      return {
        ...state,
        selectedID: action.payload,
      }
    default:
      return state;
  }
};
