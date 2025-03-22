import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import { normalizeCard } from "../../utils/cards/normalizeCard";
import { UnnormalizedCard } from "../../interfaces/cards/UnnormalizedCard";
import { editCard } from "../../Services/cardsService";
import { errorMassage, successMassage } from "../../Services/FeedbackService";
import { useNavigate, useParams } from "react-router-dom";

interface EditCardProps {}

const EditCard: FunctionComponent<EditCardProps> = () => {
  const { cardId } = useParams();

  let navigate = useNavigate();
  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
      url: "",
      alt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
    },
    validationSchema: yup.object({
      title: yup.string().required("Card Title is required").min(2).max(256),
      subtitle: yup.string().required("Subtitle is required").min(2).max(256),
      description: yup
        .string()
        .required("Description is required")
        .min(2)
        .max(1024),
      phone: yup.string().required("Phone is required").min(9).max(11),
      email: yup.string().required("Email is required").email().min(5),
      web: yup.string().min(14),
      url: yup.string().min(14),
      alt: yup.string().min(2).max(256),
      state: yup.string(),
      country: yup.string().required("Country is required"),
      city: yup.string().required("City is required"),
      street: yup.string().required("Street is required"),
      houseNumber: yup.number().required("House Number is required"),
      zip: yup.number(),
    }),
    onSubmit: (values, { resetForm }) => {
      let normalizedCard: any = normalizeCard(values as UnnormalizedCard);
      editCard(normalizedCard, cardId as string)
        .then(() => {
          successMassage("Card Updated Successfully");
          navigate("/");
        })
        .catch((err) => {
          errorMassage(err.response.data);
          console.log(err.response.data);
        });

      resetForm();
    },
  });
  return (
    <>
      <h1 className="display-2  text-center">Edit Card</h1>
      <form onSubmit={formik.handleSubmit} className="text-center">
        <div className="container">
          <div className="container">
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="title"
                autoComplete="off"
                placeholder="name@example.com"
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-danger">{formik.errors.title}</p>
              )}
              <label htmlFor="title">Card Title</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="subtitle"
                autoComplete="off"
                placeholder="name@example.com"
                name="subtitle"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.subtitle}
              />
              {formik.touched.subtitle && formik.errors.subtitle && (
                <p className="text-danger">{formik.errors.subtitle}</p>
              )}
              <label htmlFor="subtitle">Subtitle</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="description"
                autoComplete="off"
                placeholder=""
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-danger">{formik.errors.description}</p>
              )}
              <label htmlFor="description">Description</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="phone"
                className="form-control"
                id="phone"
                autoComplete="off"
                placeholder=""
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-danger">{formik.errors.phone}</p>
              )}
              <label htmlFor="phone">Phone</label>
            </div>
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
                className="form-control"
                id="web"
                autoComplete="off"
                placeholder=""
                name="web"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.web}
              />
              {formik.touched.web && formik.errors.web && (
                <p className="text-danger">{formik.errors.web}</p>
              )}
              <label htmlFor="web">Website</label>
            </div>
          </div>
          <div style={{ height: "100px" }}></div>
          <h3>Add Image</h3>
          <div className="row g-3">
            <div className="col-6">
              <div className="form-floating">
                <input
                  type="url"
                  className="form-control"
                  id="url"
                  placeholder=""
                  name="url"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.url}
                />
                {formik.touched.url && formik.errors.url && (
                  <p className="text-danger">{formik.errors.url}</p>
                )}
                <label htmlFor="url">Image Url</label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-floating mb-3">
                <input
                  type="alt"
                  className="form-control"
                  id="alt"
                  placeholder=""
                  name="alt"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.alt}
                />
                {formik.touched.alt && formik.errors.alt && (
                  <p className="text-danger">{formik.errors.alt}</p>
                )}
                <label htmlFor="alt">Image Alternative</label>
              </div>
            </div>
            <div style={{ height: "100px" }}></div>
          </div>
          {""}
          <h3>Address</h3>
          {""}
          <div className="row g-3">
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="state"
                autoComplete="off"
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
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="country"
                autoComplete="off"
                placeholder=""
                name="country"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
              />
              {formik.touched.country && formik.errors.country && (
                <p className="text-danger">{formik.errors.country}</p>
              )}
              <label htmlFor="country">Country</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="city"
                autoComplete="off"
                placeholder=""
                name="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
              />
              {formik.touched.city && formik.errors.city && (
                <p className="text-danger">{formik.errors.city}</p>
              )}
              <label htmlFor="city">City</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="street"
                autoComplete="off"
                placeholder=""
                name="street"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.street}
              />
              {formik.touched.street && formik.errors.street && (
                <p className="text-danger">{formik.errors.street}</p>
              )}
              <label htmlFor="street">Street</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="houseNumber"
                autoComplete="off"
                placeholder=""
                name="houseNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.houseNumber}
              />
              {formik.touched.houseNumber && formik.errors.houseNumber && (
                <p className="text-danger">{formik.errors.houseNumber}</p>
              )}
              <label htmlFor="houseNumber">House Number</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="zip"
                autoComplete="off"
                placeholder=""
                name="zip"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.zip}
              />
              {formik.touched.zip && formik.errors.zip && (
                <p className="text-danger">{formik.errors.zip}</p>
              )}
              <label htmlFor="zip">Zip</label>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => {}}
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
          <div style={{ height: "300px" }}></div>
        </div>
      </form>
    </>
  );
};

export default EditCard;
