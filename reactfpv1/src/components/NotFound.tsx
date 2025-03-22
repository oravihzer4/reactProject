import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface NotFoundProps {}

const NotFound: FunctionComponent<NotFoundProps> = () => {
  let navigate = useNavigate();
  return (
    <>
      <br />
      <br />
      <br />
      <div className="container w-25 text-center">
        <h1 className="text-danger">Page Not Found - 404 -</h1>
        <i className="fa-solid fa-link-slash"></i>
        <br />
        <br />
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>{" "}
        {""} {""}
        <button className="btn btn-warning" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    </>
  );
};

export default NotFound;
