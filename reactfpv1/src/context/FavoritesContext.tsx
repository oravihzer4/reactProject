import { createContext, useContext, useEffect, useState } from "react";
import { Card } from "../interfaces/Cards";

interface FavoritesContextType {
  favorites: Card[];
  addToFavorites: (card: Card) => void;
  removeFromFavorites: (cardId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Card[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (card: Card) => {
    setFavorites((prev) => [...prev, card]);
  };

  const removeFromFavorites = (cardId: string) => {
    setFavorites((prev) => prev.filter((card) => card._id !== cardId));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
