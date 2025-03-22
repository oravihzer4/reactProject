import { FunctionComponent } from "react";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import { errorMassage, successMassage } from "../Services/FeedbackService";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Services/userService";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const Login: FunctionComponent = () => {
  let navigate = useNavigate();
  const { setUser } = useAuth();

  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required().email(),
      password: yup
        .string()
        .required()
        .min(9, "Password must be at least 9 characters")
        .trim()
        .matches(/^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/),
    }),

    onSubmit: (values, { resetForm }) => {
      loginUser(values)
        .then((res) => {
          sessionStorage.setItem("token", res.data);
          const decodedUser = jwtDecode(res.data);
          setUser(decodedUser);
          successMassage("You're Online!");
          navigate("/");
          resetForm();
        })
        .catch((err) => {
          errorMassage(
            "Login failed :( Please check your details and try again"
          );
          console.log(err);
        });
    },
  });

  return (
    <>
      <br />
      <br />
      <br />
      <div className="container w-25">
        <h1 className="display-2 text-center">Login</h1>
        <form className="text-center" onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              autoComplete="off"
              placeholder="name@example.com"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              autoComplete="off"
              placeholder="Password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-danger">{formik.errors.password}</p>
            )}
            <label htmlFor="password">Password</label>
            <br />
            <button
              disabled={!formik.isValid || !formik.dirty}
              type="submit"
              className="btn btn-primary"
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="btn btn-danger m-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
