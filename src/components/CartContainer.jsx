import { motion } from "framer-motion";
import { MdOutlineKeyboardBackspace as MdOutLine } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import EmptyCart from "../img/emptyCart.svg";
import { useStateValue } from "../context/stateProvider";
import { actionType } from "../context/reducer";
import { CartItem } from "./index";
import { useEffect, useState } from "react";
function CartContainer() {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  useEffect(() => {
    let totalPrice = cartItems?.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
  }, [tot, flag, cartItems]);
  
  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col
    top-0 right-0 z-[101]"
    >
      <div className="w-full items-center justify-between p-4 cursor-pointer flex">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutLine className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p
          onClick={clearCart}
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md 
          hover:shadow-md cursor-pointer text-textColor text-base"
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* cart Items section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* cart Items  */}

            {cartItems &&
              cartItems.map((item) => (
                <CartItem
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
                  key={item.id}
                />
              ))}
          </div>

          {/* cart total section */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">${tot}</p>
            </div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$2.5</p>
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">
                ${tot + 2.5}
              </p>
            </div>
            {user ? (
              <motion.button
                whileTap={{ scale: 0.9 }}
                type="button"
                className="w-full p-2 rounded-full bg-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Check Out
              </motion.button>
            ) : (
              <p className="text-gray-50 text-xl">Please login to check out</p>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6 ">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default CartContainer;
