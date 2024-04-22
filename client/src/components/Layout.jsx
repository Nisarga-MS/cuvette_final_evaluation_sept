import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setScreenSize } from "../redux/layout/layoutSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  const verifyScreenSize = () => {
    const screenWidth = window.innerWidth;
    dispatch(
      setScreenSize({
        isSmallScreen: screenWidth < 768,
        isLargeScreen: screenWidth >= 768,
      })
    );
  };
  useEffect(() => {
    verifyScreenSize();
    window.addEventListener("resize", verifyScreenSize);
    return () => {
      window.removeEventListener("resize", verifyScreenSize);
    };
  }, []);
  return <>{children}</>;
};

export default Layout;
