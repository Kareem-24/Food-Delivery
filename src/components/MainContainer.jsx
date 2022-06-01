import { useStateValue } from "../context/stateProvider";
import {
  FruitSection,
  HomeContainer,
  MenuContainer,
  CartContainer,
} from "./index";
function MainContainer() {
  const [{ cartShow }, dispatch] = useStateValue();

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />
      <FruitSection />
      <MenuContainer />
      {cartShow && <CartContainer />}
    </div>
  );
}

export default MainContainer;
