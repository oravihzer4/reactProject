import { jwtDecode } from "jwt-decode";

export function decodeToken() {
  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token as string);
  return decodedToken;
}
