import { Navigate, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import Signup from "./body/auth/signup";
import Attendance from "./body/attendance/attendance";
import AttendanceDetails from "./body/attendance/attendanceDetails";

const mapStateToProps = (state) => {
  return {
    token: state.state.auth.token,
    userId: state.state.auth.userId,
  };
};

const MyRoutes = (props) => {
  let authRoute = (
    <Routes>
      <Route exact path="/auth" element={<Signup />} />
      <Route exact path="/attendance" element={<Attendance />} />
      <Route exact path="/attendance-details" element={<AttendanceDetails />} />
      <Route exact path="/" element={<Navigate replace to="/auth" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
  return <div className="">{authRoute}</div>;
};

export default connect(mapStateToProps)(MyRoutes);
