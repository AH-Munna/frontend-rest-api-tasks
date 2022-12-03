import * as actTypes from "./ActionType.js";
import axios from "axios";

const storeAttendanceInRedux = data => {
  return {
    type: actTypes.STORE_ATTENDANCE_IN_REDXUX,
    payload: data,
  }
}

export const AttendanceInfo = (tokens) => (dispatchEvent) => {
  axios
    .get("https://test.nexisltd.com/test", {
      headers: {
        "Authorization": `token ${tokens.access_token}`,
      },
    })
    .then((res) => {
      dispatchEvent(storeAttendanceInRedux(res.data));
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const SelectedAttendeeID = id => {
  return {
    type: actTypes.SELECTED_ID,
    payload: id,
  }
}
