import { Flip, toast } from "react-toastify";

export function successMassage(massage: string) {
  toast.success(massage, {
    position: "top-center",
    autoClose: 5000,
    theme: "light",
    transition: Flip,
  });
}
export function errorMassage(massage: string) {
  toast.error(massage, {
    position: "top-center",
    autoClose: 5000,
    theme: "light",
    transition: Flip,
  });
}
