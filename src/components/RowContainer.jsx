import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useStateValue } from "../context/stateProvider";
import { actionType } from "../context/reducer";

function RowContainer({ flag, data, scrollValue }) {
  const rowContainer = useRef();
  const [items, setItems] = useState([]);
  const [{ cartItems }, dispatch] = useStateValue();

  const addToCart = useCallback(() => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    if(items.length > 0) {
    localStorage.setItem("cartItems", JSON.stringify(items));}
  },[dispatch, items]);

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    addToCart();
  }, [addToCart]);

  return (
    <div
      ref={rowContainer}
      className={`w-full my-12 flex items-center gap-3 scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data &&
        data.map((item) => (
          <div
            key={item.id}
            className="w-300 min-w-[300px] md:w-340 md:min-w-[340px] h-[215px] backdrop-blur-lg my-12  
            bg-cardOverlay rounded-lg hover:drop-shadow-lg px-3 items-center justify-between flex flex-col"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-40 h-40 drop-shadow-2xl -mt-8"
              >
                <img
                  src={item?.imageURL}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </motion.div>

              <motion.div
                onClick={() => setItems([...cartItems, item])}
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
            <div className="w-full flex flex-col items-end justify-end">
              <p className="text-textColor font-semibold  text-base md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.calories} calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor">
                  <span className="text-sm text-red-500">$</span>
                  {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default RowContainer;
