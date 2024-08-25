import { useEffect, useState } from "react";
import Logo from "../Logo";
import * as Styled from "./GlobalLoading.styled";
import { useSelector } from "react-redux";

export default function GlobalLoading() {
  const { globalLoading } = useSelector((state) => state.globalLoading);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (globalLoading) {
      setIsloading(true);
    } else {
      setIsloading(false);
    }
  }, [globalLoading]);

  return (
    <Styled.Box $isLoading={isLoading}>
      <Styled.Loading>
        <span></span>
        <span></span>
      </Styled.Loading>
      <Logo />
    </Styled.Box>
  );
}
