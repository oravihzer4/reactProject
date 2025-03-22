import { FunctionComponent, useEffect, useState } from "react";
import { Card } from "../interfaces/Cards";
import { getAllCards } from "../Services/cardsService";
import Bcard from "./cards/Bcard";
import { decodeToken } from "../Services/tokenService";

interface MyCardsProps {}

const MyCards: FunctionComponent<MyCardsProps> = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userDetails = decodeToken() as { _id: string };

  useEffect(() => {
    getAllCards()
      .then((res) => {
        const filteredCards = res.data.filter(
          (card: Card) => card.user_id === userDetails._id
        );
        setCards(filteredCards);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <br />
      <br />
      <br />
      <div className="container w-25 text-center">
        <h1>My Cards</h1>
      </div>
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
          {cards.length ? (
            cards.map((card: Card) => <Bcard key={card._id} card={card} />)
          ) : (
            <p className="text-center">No cards found.</p>
          )}
        </div>
      )}

      <div style={{ height: "500px" }}></div>
    </>
  );
};

export default MyCards;
