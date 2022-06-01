import { actionType } from "../context/reducer";
import { useStateValue } from "../context/stateProvider";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { offersData } from "../utils/data";
function HomeContainer() {
  const [{ cartShow }, dispatch] = useStateValue();

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
      <div className=" gap-6 py-2 flex-1 flex flex-col items-start md:items-start justify-center">
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-2 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">Delivery</p>

          <div className="w-8 h-8 overflow-hidden bg-white rounded-full drop-shadow-xl">
            <img
              src={Delivery}
              alt="delivery"
              className="w-full object-contain "
            />
          </div>
        </div>
        <p className="text-[3rem] font-bold tracking-wider text-headingColor">
          The Fastes Delivery in
          <span className="text-orange-600 text-[3.5rem]">Your City</span>
        </p>

        <p className="text-base text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
          corporis quia accusantium dolorum! Quas officia sapiente dignissimos,
          labore, ab quo maxime provident, eaque quisquam explicabo consectetur.
          Voluptatem deserunt illum laboriosam.
        </p>
        <button
          onClick={showCart}
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out"
        >
          Order Now
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative">
        <img src={HeroBg} alt="" className="ml-auto h-420 md:h-600 lg:w-auto" />

        <div className="w-full h-full top-0 left-0 flex items-center justify-center absolute lg:gap-6 gap-4 flex-wrap xl:px-20">
          {offersData &&
            offersData.map((item) => (
              <div
                key={item.id}
                className=" lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center shadow-lg "
              >
                <img
                  src={item.imageSrc}
                  alt=""
                  className=" w-20 lg:w-40 -mt-10  "
                />
                <p className="text-base lg:text-lg font-semibold text-textColor mt-2 lg:mt-4">
                  {item.name}
                </p>
                <p className="text-[12px] lg:text-sm text-lightTextGray font-semibold my-1 lg:my-3">
                  {item.description}
                </p>
                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-red-600">$</span>
                  {item.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default HomeContainer;
