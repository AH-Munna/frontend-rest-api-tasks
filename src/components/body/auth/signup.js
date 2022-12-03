import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import formImage from "../../../assets/images/devTeam.jpg";
import { auth_login } from "../../../redux/AuthActionCreator";
import "./signup.css";

const mapDispatchToProps = (dispatchEvent) => {
  return {
    authLogin: (data) => dispatchEvent(auth_login(data)),
  };
};

const Signup = (props) => {
  const [userMode, setUserMode] = useState("Login");
  const [signupPage, setSignupPage] = useState(1);
  const warningColor = "text-warning";

  const switchMode = () => {
    if (userMode === "Sign Up") {
      setUserMode("Login");
    } else {
      setUserMode("Sign Up");
    }
  };
  const prevSignup = () => {
    setSignupPage(signupPage - 1);
  };
  const navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={{
          fName: "",
          lName: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => {
          if (userMode === "Sign Up") setSignupPage(signupPage + 1);
          if (signupPage >= 3) {
            setSignupPage(3);

            if (userMode === "Sign Up") {
              if (
                !values.fName ||
                !values.lName ||
                !values.phone ||
                !values.email ||
                !values.password
              ) {
                return alert("no field can be empty.");
              } else {
                const signupObj = {
                  first_name: values.fName,
                  last_Name: values.lName,
                  phone_number: `0${values.phone}`,
                  email: values.email,
                  password: values.password,
                };
                // debugger;

                // signup request
                axios
                  .post("https://test.nexisltd.com/signup", signupObj)
                  .then((res) => {
                    alert("registration complete, you can now log in.");
                    console.log(res.data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }
          }

          // login request
          if (userMode === "Login") {
            const loginObj = {
              email: values.email,
              password: values.password,
            };
            axios
              .post("https://test.nexisltd.com/login", loginObj)
              .then((res) => {
                props.authLogin(res.data);
                navigate("/attendance");
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }}

        // validation
        validate={(values) => {
          const errors = {};

          if (!values.fName && userMode === "Sign Up")
            errors.fName = "can't be empty";
          if (!values.lName && userMode === "Sign Up")
            errors.lName = "can't be empty";
          if (values.fName && values.fName.length < 3)
            errors.fName = "at least 3 letters";
          if (values.lName && values.lName.length < 3)
            errors.lName = "at least 3 letters";

          if (userMode === "Sign up" && signupPage === 2) {
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Enter valid email";
            }
          }
          if (
            signupPage === 3 &&
            userMode === "Sign Up" &&
            values.password &&
            values.password.length < 8
          )
            errors.password = "Password should be at least 8 characters";
          if (
            userMode === "Login" &&
            values.password &&
            values.password.length < 8
          )
            errors.password = "Password should be at least 8 characters";
          return errors;
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <>
            <Row>
              <Col>
                <div className="text-center mb-5 fs-2 text-info fw-bold">
                  Login or Signup to view Account info
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={7}>
                <img src={formImage} width="100%" alt="development-team" />
              </Col>
              <Col md={5} className="shadow">
                <div className="fw-bold text-success my-5 fs-3 text-center">
                  {userMode} form
                </div>
                <Row>
                  <Col
                    className="d-flex justify-content-center text-center"
                    id="login"
                  >
                    <form onSubmit={handleSubmit} className="col-md-9 pt-5">
                      {userMode === "Login" ? (
                        <>
                          <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            className="form-control"
                            placeholder="example@mail.com"
                          />
                          <span className="warningColor">
                            {errors.email && touched.email && errors.email}
                          </span>
                          <br />

                          <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            className="form-control fs-5"
                            placeholder="password"
                          />
                          <span className={warningColor}>
                            {errors.password && touched.password && errors.password}
                          </span>
                          <br />
                        </>
                      ) : (
                        <>
                          {/* Signup fields part 1 */}
                          {signupPage === 1 ? (
                            <>
                              <input
                                type="text"
                                name="fName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.fName}
                                className="form-control fs-5"
                                placeholder="Your First Name..."
                              />
                              <span className={warningColor}>
                                {errors.fName && touched.fName && errors.fName}
                              </span>
                              <br />

                              <input
                                type="text"
                                name="lName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lName}
                                className="form-control mt-3 fs-5"
                                placeholder="Your Last Name..."
                              />
                              <span className={warningColor}>
                                {errors.lName && touched.lName && errors.lName}
                              </span>
                              <br />
                            </>
                          ) : null}

                          {/* Signup fields part 2 */}
                          {signupPage === 2 ? (
                            <>
                            <Row>
                              <Col md={3}><input
                              disabled={true}
                                className="form-control fs-5"
                                placeholder="+880"
                              /></Col>
                              <Col md={9}><input
                                type="number"
                                name="phone"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                                className="form-control fs-5"
                                placeholder="01XXXXXXXXX"
                              />
                              <span className={warningColor}>
                                {errors.phone && touched.phone && errors.phone}
                              </span>
                              <br /></Col>
                              </Row>

                              <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className="form-control mt-3 fs-5"
                                placeholder="Your Email Address"
                              />
                              <span className={warningColor}>
                                {errors.email && touched.email && errors.email}
                              </span>
                              <br />
                            </>
                          ) : null}

                          {/* Signup fields part 3 */}
                          {signupPage === 3 ? (
                            <>
                              <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                className="form-control fs-5"
                                placeholder="password"
                              />
                              <span className={warningColor}>
                                {errors.password && touched.password && errors.password}
                              </span>
                              <br />
                            </>
                          ) : null}
                        </>
                      )}

                      <button
                        // disabled={isSubmitting}
                        type="submit"
                        className="btn btn-outline-info shadow rounded-pill px-5 py-2 fs-5 mt-3"
                      >
                        {userMode === "Login" ? (<>Login</>) : (<>Next Step{" "}
                            <i className="fa fa-arrow-right" style={{ fontSize: "25px", color: "blue" }}></i>
                          </>)}
                      </button>
                    </form>
                  </Col>
                </Row>
                <div className="d-flex justify-content-center">
                  {userMode === "Sign Up" ? (
                    signupPage > 1 ? (
                      <button
                        onClick={prevSignup}
                        className="btn btn-outline-primary mt-1 rounded-pill px-5"
                      >
                        back
                      </button>
                    ) : null
                  ) : null}
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    onClick={switchMode}
                    disabled={userMode === "Login"}
                    type="button"
                    className="me-1 btn shadow btn-outline-secondary rounded-pill px-5 py-2 fw-bold fs-6 mb-3 mt-5"
                  >
                    Login
                  </button>

                  <button
                    onClick={switchMode}
                    disabled={userMode === "Sign Up"}
                    type="button"
                    className="btn shadow btn-outline-secondary rounded-pill px-3 py-2 fw-bold fs-6 mb-3 mt-5"
                  >
                    Registration
                  </button>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Formik>
    </>
  );
};

export default connect(null, mapDispatchToProps)(Signup);
