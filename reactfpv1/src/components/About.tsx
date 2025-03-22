import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <>
      <br />
      <br />
      <br />
      <div className="container text-center">
        {" "}
        <h1 className="display-3">Welcome to BCard</h1>
        <p className="aboutParagraph">
          the ultimate platform for businesses to showcase their services and
          connect with potential customers effortlessly. <br /> Whether you own
          a small local shop or a large enterprise, our app provides the perfect
          space to share your business with the world. <br /> What We Offer:{" "}
          <br /> Business Listings – Easily post and manage your business
          profile ✅ <br /> Customer Engagement – Guests can like, save, and
          call businesses directly ✅ <br /> Seamless Registration & Login –
          Secure and user-friendly access for both businesses and visitors ✅
          <br /> Discover & Connect – Users can explore various businesses and
          find exactly what they need ✅ <br /> <br /> Join BCard today and grow
          your business with a community that cares! 🚀
        </p>
      </div>
      <div style={{ height: "400px" }}></div>
      <div style={{ height: "400px" }}></div>

      <div className="container text-center">
        <h1 className="opacity-50 ">Developed by Or Avihzer</h1>
        <br />
        <h4 className="opacity-50 container text-center">
          oravihzer4@gmail.com
        </h4>
        <br />

        <h1>
          {" "}
          <Link target="_blank" to={"https://github.com/oravihzer4"}>
            <i className="fa-brands fa-github opacity-50 githubLogo"></i>
          </Link>
        </h1>
        <img
          className="avatar"
          src="https://art.pixilart.com/b3679033fcbf417.png"
        />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default About;
