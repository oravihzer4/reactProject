import { FunctionComponent } from "react";
import { useFavorites } from "../context/FavoritesContext";
import Bcard from "../components/cards/Bcard";

const Favorites: FunctionComponent = () => {
  const { favorites } = useFavorites();

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <h1 className="text-center mb-4">Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-muted text-center">No favorite cards yet.</p>
      ) : (
        <div className="row">
          {favorites.map((card) => (
            <div className=" d-flex justify-content-center" key={card._id}>
              <Bcard card={card} />
            </div>
          ))}
        </div>
      )}
      <div style={{ height: "500px" }}></div>
    </div>
  );
};

export default Favorites;
