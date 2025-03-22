import { FunctionComponent } from "react";
import { Card } from "../../interfaces/Cards";
import { successMassage, errorMassage } from "../../Services/FeedbackService";
import { Link, useNavigate } from "react-router-dom";
import { deleteCard } from "../../Services/cardsService";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";

interface BcardProps {
  card: Card;
}

const Bcard: FunctionComponent<BcardProps> = ({ card }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  const isFavorite = favorites.some((fav) => fav._id === card._id);

  return (
    <div className="container d-flex justify-content-center">
      <div
        className="card m-3 p-3 shadow-lg"
        style={{
          borderRadius: "10px",
          width: "100%",
          maxWidth: "18rem",
        }}
      >
        <img
          className="card-img-top rounded"
          src={card.image.url}
          alt={card.image.alt}
          style={{ maxHeight: "200px", objectFit: "cover", width: "100%" }}
        />

        <div className="card-body text-center">
          <h2 className="card-title text-dark">{card.title}</h2>
          <h6 className="card-subtitle mb-2 text-dark">{card.subtitle}</h6>
        </div>

        <ul className="list-group list-group-flush text-center">
          <li className="list-group-item">
            <strong>Phone:</strong> {card.phone}
          </li>
          <li className="list-group-item">
            <strong>Address:</strong>{" "}
            {`${card.address.street} ${card.address.houseNumber}, ${card.address.city}`}
          </li>
          <li className="list-group-item">
            <strong>Card Number:</strong> {card.bizNumber}
          </li>
        </ul>

        <div className="card-body d-flex justify-content-around flex-wrap ">
          <Link to={`tel:${card.phone}`} className="text-success">
            <i className="fa-solid fa-phone-volume fa-lg mt-3"></i>
          </Link>

          {user && (
            <button
              className={`btn ${isFavorite ? "text-danger" : "text-secondary"}`}
              onClick={() => {
                if (isFavorite) {
                  removeFromFavorites(card._id as string);
                  successMassage("Card Removed from Favorites!");
                } else {
                  addToFavorites(card);
                  successMassage("Card Added to Favorites!");
                }
              }}
            >
              <i className="fa-solid fa-heart"></i>
            </button>
          )}

          {(user?._id === card.user_id || user?.isAdmin) && (
            <>
              <button
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasTop"
                aria-controls="offcanvasTop"
                className="btn text-warning"
              >
                <i
                  className="fa-solid fa-pen-to-square fa-lg text-center"
                  onClick={() => {
                    navigate(`/EditCard/${card._id}`);
                  }}
                ></i>
              </button>

              <a
                style={{ cursor: "pointer" }}
                className="text-danger mt-2"
                onClick={() => {
                  if (confirm("Are you sure you want to delete this card?")) {
                    deleteCard(card._id as string)
                      .then(() => {
                        successMassage("Card Deleted Successfully");
                        window.location.reload();
                      })
                      .catch((err) => errorMassage(err));
                  } else {
                    errorMassage(
                      "Card Not Deleted! You must be the creator of the card or an Admin user."
                    );
                  }
                }}
              >
                <i className="fa-solid fa-trash fa-lg"></i>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bcard;
