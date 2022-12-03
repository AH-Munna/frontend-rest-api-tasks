import * as actTypes from "./ActionType.js";

export const auth_login = (data) => {
  return {
    type: actTypes.AUTHENTICATION_SUCCESS,
    payload: data,
  };
};
