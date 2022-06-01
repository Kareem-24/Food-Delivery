import { motion } from "framer-motion";
import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useStateValue } from "../context/stateProvider";
import { RowContainer } from "./index";
function FruitSection() {
  const [{ foodItems }] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);
  const handelScrollingLeft = () => {
    setScrollValue(0);

    setTimeout(() => setScrollValue(-200), 50);
  };
  const handelScrollingRight = () => {
    setScrollValue(0);

    setTimeout(() => setScrollValue(200), 50);
  };
  return (
    <section className="w-full my-6">
      <div className="w-full flex items-center justify-between">
        <p
          className="text-2xl  font-semibold uppercase relative text-headingColor
        before:absolute before:rounded-lg before:content before:w-32 before:h-1
        before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400
          to-orange-600 transition-all ease-in-out duration-100"
        >
          Our Fresh & Healthy Fruits
        </p>
        <div className="hidden md:flex gap-3 items-center ">
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer  flex items-center justify-center"
            onClick={handelScrollingLeft}
          >
            <MdChevronLeft className="text-lg text-white" />
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer  flex items-center justify-center"
            onClick={handelScrollingRight}
          >
            <MdChevronRight className="text-lg text-white" />
          </motion.div>
        </div>
      </div>
      <RowContainer
        scrollValue={scrollValue}
        flag={true}
        data={foodItems?.filter((n) => n.category === "fruits")}
      />
    </section>
  );
}

export default FruitSection;
