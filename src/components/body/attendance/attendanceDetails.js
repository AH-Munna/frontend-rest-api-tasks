import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router";

const mapStateToProps = (state) => {
  return {
    selectedID: state.state.selectedID,
    attendance_data: state.state.attendance_data,
  };
};

const AttendanceDetails = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!props.attendance_data) return navigate("/auth");
  }, []);
  if (!props.attendance_data) return <></>;

  let tableRowRender = [];

  const data = props.attendance_data[props.selectedID].attendance;
  const keys = Object.keys(data);
  let rowCount = 1;
  for (let key of keys) {
    let attendanceRender = data[key].times.map((time) => {
      return <li>{time}</li>;
    });

    // concating the Rows on the array tableRowRender
    tableRowRender = [
      ...tableRowRender,
      <tr className="trDetails">
        <th scope="row">{rowCount++}</th>
        <td>{key}</td>
        <td>{data[key].status}</td>
        <td>
          <ol>{attendanceRender}</ol>
        </td>
      </tr>,
    ];
  }

  return (
    <>
      <h1
        style={{ textTransform: "uppercase" }}
        className="text-center text-success mt-5 mb-2 fw-bold"
      >
        {props.attendance_data[props.selectedID].name}
      </h1>
      <Row>
        <Col>
          <div className="text-center fs-4">
            Branch:{" "}
            <span className="text-info">
              {props.attendance_data[props.selectedID].branch}
            </span>
          </div>
        </Col>
        <Col>
          <div className="text-center fs-4">
            Position:{" "}
            <span className="text-info">
              {props.attendance_data[props.selectedID].position}
            </span>
          </div>
        </Col>
      </Row>
      <hr className="mb-5 shadow" />
      <h3 className="text-warning text-center">Attendance Details</h3>
      <table className="table table-hover table-striped text-center">
        <thead>
          <tr className="trDetails">
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Attendance Times</th>
          </tr>
        </thead>
        <tbody>{tableRowRender}</tbody>
      </table>
    </>
  );
};

export default connect(mapStateToProps)(AttendanceDetails);
