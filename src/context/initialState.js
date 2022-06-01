import { fetchCart, fetchUSer } from "../utils/fetchLocalStorageData";

const userInfo = fetchUSer();
const cartInfo = fetchCart();

export const initialState = {
  user: userInfo,
  foodItems: null,
  cartShow: false,
  cartItems: cartInfo,
};
