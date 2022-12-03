import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { AttendanceInfo, SelectedAttendeeID } from "../../../redux/ActionCreator";
import './attendance.css';

const mapDispatchToProps = (dispatchEvent) => {
  return {
    loadAttendance: (tokens) => dispatchEvent(AttendanceInfo(tokens)),
    selectedID: id => dispatchEvent(SelectedAttendeeID(id)),
  };
};
const mapStateToProps = (state) => {
  return {
    tokens: state.state.auth,
    attendance: state.state.attendance_data,
  };
};

const Attendance = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!props.tokens.refresh_token) return navigate("/auth");
    props.loadAttendance(props.tokens);
  }, []);

  const rowClicked = key => {
    props.selectedID(key);
    navigate('/attendance-details', {id: key})
  }
  
  // user list table is dynamic, so more attendee will be added to table automatically
  let tableRender = [];
  if (props.attendance) {
    const keys = Object.keys(props.attendance);
    let userCount = 1;
    for (let key of keys) {
      const dates = Object.keys(props.attendance[key].attendance)
      
      // getting total number of days present
      let presentCount = 0;
      for (let x of dates) {
        const status = props.attendance[key].attendance[x].status;
        if (status === "late" || status === "present") {
          presentCount = presentCount + 1;
        }
      }

      // rendering the list rows
      let tempTableRender = <tr className="trList" onClick={() => rowClicked(key)}>
        <th scope="row">{userCount++}</th>
        <td>{props.attendance[key].name}</td>
        <td>{presentCount}</td>
      </tr>

      tableRender = [...tableRender, tempTableRender];
    }
  }
  return <>
    <h1 className="text-center text-success mt-5 fw-bold">ALL USER LIST</h1>
    <div className="fs-5 text-center mt-2 mb-5 text-success">press on a row to view that user's details</div>
    <table className="table table-hover table-striped text-center fs-5">
    <thead>
      <tr className="trList">
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Total Present</th>
      </tr>
    </thead>
    <tbody>
      {tableRender}
    </tbody>
  </table></>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Attendance);
