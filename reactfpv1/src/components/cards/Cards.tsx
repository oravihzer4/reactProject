import { FunctionComponent, useEffect, useState } from "react";
import Bcard from "./Bcard";
import { getAllCards } from "../../Services/cardsService";
import { Card } from "../../interfaces/Cards";
import { useNavigate } from "react-router-dom";

interface CardsProps {}

const Cards: FunctionComponent<CardsProps> = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    getAllCards()
      .then((res) => {
        setCards(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <center>
        <br />
        <br />
        <br />
        <div id="topHome">
          {sessionStorage.getItem("token") ? (
            <button
              onClick={() => {
                navigate("/addCard");
              }}
              className="btn btn-primary"
            >
              Add New Card
            </button>
          ) : (
            <h3>
              Hi Guest <i className="fa-solid fa-person-circle-question"></i>
            </h3>
          )}
        </div>
      </center>
      <br />
      <br />
      {isLoading ? (
        <center>
          {" "}
          <div
            className="spinner-grow text-danger center p-2 m-2"
            role="status"
          >
            {" "}
          </div>
          <div
            className="spinner-grow text-success center p-2 m-2"
            role="status"
          >
            {" "}
          </div>
          <div
            className="spinner-grow text-warning center p-2 m-2"
            role="status"
          >
            {" "}
          </div>
          <div
            className="spinner-grow text-primary center p-2 m-2"
            role="status"
          >
            {" "}
          </div>
        </center>
      ) : (
        <div className="row">
          {cards.map((card: Card) => (
            <Bcard key={card._id} card={card} />
          ))}
        </div>
      )}
      <div style={{ height: "300px" }}></div>
    </>
  );
};

export default Cards;
