import React, { useEffect, useRef, useState } from "react";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/stateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);
  const ref = useRef();

  const handleLogin = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const handleLogout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  // useEffect(() => {
  //   const handleModalClose = (e) => {
  //     if (isMenu && ref.current && !ref.current.contains(e.target)) {
  //       setIsMenu(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleModalClose);
  //   return () => {
  //     // Cleanup the event listener
  //     document.removeEventListener("mousedown", handleModalClose);
  //   };
  // }, [isMenu]);

  return (
    <header className="w-screen fixed z-50 p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-8 object-cover" />
          <p className="text-headingColor text-xl font-bold">Indian City</p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              Menu
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              Home
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              About Us
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              Service
            </li>
          </motion.ul>
          <motion.div
            className="relative flex items-center justify-center"
            whileTap={{ scale: 0.6 }}
          >
            <MdShoppingBasket
              className="text-textColor text-2xl  cursor-pointer"
              size="30"
            />
            <div className="w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center absolute top-0 -right-2">
              <p className="text:xs text-white font-semibold">2</p>
            </div>
          </motion.div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user?.photoURL : Avatar}
              alt=""
              className=" rounded-full w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer"
              onClick={handleLogin}
            />
            {isMenu && (
              <motion.div
                ref={ref}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg absolute top-12 right-0 flex flex-col"
              >
                {user && (
                  <Link to={"/createItem"}>
                    <p
                      className="flex px-4 py-2 items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                <p
                  className="flex px-4 py-2 items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={handleLogout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex md:hidden w-full items-center justify-between ">
        <motion.div
          className="relative flex items-center justify-center"
          whileTap={{ scale: 0.6 }}
        >
          <MdShoppingBasket
            className="text-textColor text-2xl  cursor-pointer"
            size="30"
          />
          <div className="w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center absolute top-0 -right-2">
            <p className="text:xs text-white font-semibold">2</p>
          </div>
        </motion.div>

        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-8 object-cover" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user?.photoURL : Avatar}
            alt=""
            className=" rounded-full w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer"
            onClick={handleLogin}
          />
          {isMenu && (
            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg absolute top-12 right-0 flex flex-col"
            >
              {user && (
                <Link to={"/createItem"}>
                  <p className="flex px-4 py-2 items-center cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <ul className="flex flex-col">
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100  px-4 py-2">
                  Menu
                </li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100  px-4 py-2">
                  Home
                </li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100  px-4 py-2">
                  About Us
                </li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100  px-4 py-2">
                  Service
                </li>
              </ul>
              <p
                className="flex m-2 p-2 items-center justify-center gap-3 cursor-pointer bg-slate-200 hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base rounded-md shadow-lg"
                onClick={handleLogout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
