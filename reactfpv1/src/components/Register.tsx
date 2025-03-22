import { FunctionComponent } from "react";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import { successMassage } from "../Services/FeedbackService";
import { useNavigate } from "react-router-dom";
import { normalizeUser } from "../utils/users/normalizeUser";
import { unnormalizedUser } from "../interfaces/users/UnnormalaziedUser";
import { registerUser } from "../Services/userService";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  let navigate = useNavigate();
  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      imageUrl: "",
      imageAlt: "",
      state: "",
      city: "",
      country: "",
      houseNumber: "",
      street: "",
      isBusiness: false,
      zip: "",
    },
    validationSchema: yup.object({
      email: yup.string().required().email(),
      password: yup
        .string()
        .required()
        .min(9, "password must be at least 9 characters")
        .trim()
        .matches(/^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
      firstName: yup.string().required("First Name is a required field"),
      middleName: yup.string(),
      lastName: yup.string().required("Last Name is a required field"),
      phone: yup
        .string()
        .required("Phone number is required")
        .matches(
          /^[+]?[0-9]{10,15}$/,
          "Phone number must be valid (e.g., +1234567890 or 1234567890)"
        ),
      state: yup.string(),
      country: yup.string().required(),
      city: yup.string().required(),
      street: yup.string().required(),
      houseNumber: yup.string().required(),
      zip: yup.string().required(),
      isBusiness: yup.boolean().required(),
    }),
    onSubmit: (values, { resetForm }) => {
      const normalizedUser = normalizeUser(values as unnormalizedUser);
      registerUser(normalizedUser)
        .then((res) => {
          console.log(res);
          console.log(normalizedUser);
        })
        .catch((err) => console.log(err));
      successMassage("Registered Successfully, Check Your Email Box!");
      resetForm();
      navigate("/login");
    },
  });

  return (
    <>
      <div className="container w-100 mx-auto py-3">
        <h1 className="display-2 text-center mb-4 ">Register</h1>
        <form className="text-center" onSubmit={formik.handleSubmit}>
          <div className="row g-3">
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="John"
                  name="firstName"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="text-danger">{formik.errors.firstName}</p>
                )}
                <label htmlFor="firstName">First Name</label>
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="middleName"
                  placeholder="John"
                  name="middleName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.middleName}
                />
                {formik.touched.middleName && formik.errors.middleName && (
                  <p className="text-danger">{formik.errors.middleName}</p>
                )}
                <label htmlFor="middleName">Middle Name</label>
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Doe"
                  name="lastName"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="text-danger">{formik.errors.lastName}</p>
                )}
                <label htmlFor="lastName">Last Name</label>
              </div>
            </div>
          </div>

          <div className="row g-2">
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="tel"
                  className="form-control"
                  id="tel"
                  placeholder="+972"
                  name="phone"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-danger">{formik.errors.phone}</p>
                )}
                <label htmlFor="tel">Phone</label>
              </div>
            </div>

            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="jhon@doe.com"
                  name="email"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-danger">{formik.errors.email}</p>
                )}
                <label htmlFor="email">Email</label>
              </div>
            </div>
          </div>
          <div className="row g-2">
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder=""
                  name="password"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-danger">{formik.errors.password}</p>
                )}
                <label htmlFor="password">Password</label>
              </div>
            </div>

            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder=""
                  name="confirmPassword"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="text-danger">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>
            </div>
          </div>

          <div className="row g-2">
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="url"
                  className="form-control"
                  id="imageUrl"
                  placeholder=""
                  name="imageUrl"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.imageUrl}
                />
                {formik.touched.imageUrl && formik.errors.imageUrl && (
                  <p className="text-danger">{formik.errors.imageUrl}</p>
                )}
                <label htmlFor="imageUrl">Profile Image URL</label>
              </div>
            </div>

            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="imageAlt"
                  placeholder=""
                  name="imageAlt"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.imageAlt}
                />
                {formik.touched.imageAlt && formik.errors.imageAlt && (
                  <p className="text-danger">{formik.errors.imageAlt}</p>
                )}
                <label htmlFor="imageAlt">Alternative Text</label>
              </div>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  placeholder=""
                  name="state"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                />
                {formik.touched.state && formik.errors.state && (
                  <p className="text-danger">{formik.errors.state}</p>
                )}
                <label htmlFor="state">State</label>
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  placeholder=""
                  name="country"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                />
                {formik.touched.country && formik.errors.country && (
                  <p className="text-danger">{formik.errors.country}</p>
                )}
                <label htmlFor="country">Country</label>
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder=""
                  name="city"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                />
                {formik.touched.city && formik.errors.city && (
                  <p className="text-danger">{formik.errors.city}</p>
                )}
                <label htmlFor="city">City</label>
              </div>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  placeholder=""
                  name="street"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.street}
                />
                {formik.touched.street && formik.errors.street && (
                  <p className="text-danger">{formik.errors.street}</p>
                )}
                <label htmlFor="street">Street</label>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="houseNumber"
                  placeholder=""
                  name="houseNumber"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.houseNumber}
                />
                {formik.touched.houseNumber && formik.errors.houseNumber && (
                  <p className="text-danger">{formik.errors.houseNumber}</p>
                )}
                <label htmlFor="houseNumber">House Number</label>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="zip"
                  placeholder=""
                  name="zip"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.zip}
                />
                {formik.touched.zip && formik.errors.zip && (
                  <p className="text-danger">{formik.errors.zip}</p>
                )}
                <label htmlFor="zip">Zip Code</label>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-start mt-3 isbus">
            {"  "}{" "}
            <label className="form-check-label isbus" htmlFor="isBusiness">
              <h6> Is Business?</h6>
            </label>
            <input
              className="form-check-input"
              type="checkbox"
              id="isBusiness"
              name="isBusiness"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.isBusiness}
            />
            {formik.touched.isBusiness && formik.errors.isBusiness && (
              <p className="text-danger">{formik.errors.isBusiness}</p>
            )}
            <div className="p-1 m-1"></div>
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={() => formik.resetForm()}
            >
              Reset
            </button>
            <button
              disabled={!formik.isValid || !formik.dirty}
              type="submit"
              className="btn btn-success"
            >
              Submit
            </button>
          </div>
        </form>
        <div style={{ height: "100px" }}></div>
      </div>
    </>
  );
};

export default Register;
