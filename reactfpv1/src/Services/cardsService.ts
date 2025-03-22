import axios from "axios";
import { Card } from "../interfaces/Cards";

const API: string = import.meta.env.VITE_CARDS_API;

// get all cards
export function getAllCards() {
  return axios.get(API);
}
// delete card

export function deleteCard(cardId: string) {
  return axios.delete(`${API}/${cardId}`, {
    headers: {
      "x-auth-token": sessionStorage.getItem("token"),
    },
  });
}
export function getCardById(cardId: string) {
  return axios.get(`${API}/${cardId}`);
}
// add card
export function addNewCard(normalizedCard: Card) {
  return axios.post(API, normalizedCard, {
    headers: {
      "x-auth-token": sessionStorage.getItem("token"),
    },
  });
}
//
export function addToFavorites(card: Card) {
  return axios.patch(`${API}/${card}/favorite`, null, {
    headers: {
      "x-auth-token": sessionStorage.getItem("token"),
    },
  });
}
// get user by id
export function getUserById(userId: string) {
  return axios.get(`${API}/users/${userId}`, {
    headers: {
      "x-auth-token": sessionStorage.getItem("token"),
    },
  });
}
//edit card
export function editCard(cardData: Card, cardId: string) {
  return axios.put(`${API}/${cardId}`, cardData, {
    headers: {
      "x-auth-token": sessionStorage.getItem("token"),
    },
  });
}
