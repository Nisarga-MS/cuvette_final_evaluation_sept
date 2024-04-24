import React, { useEffect } from "react";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";
import { useSelector } from "react-redux";

const Header = () => {
  const { isSmallScreen } = useSelector((state) => state.layout);
  
  useEffect(() => {

  }, [isSmallScreen]);
  return <>{isSmallScreen ? <HeaderMobile /> : <HeaderDesktop />}</>;
};

export default Header;
