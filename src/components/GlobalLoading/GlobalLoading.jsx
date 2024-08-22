import Logo from "../Logo";
import * as Styled from "./GlobalLoading.styled";

export default function GlobalLoading() {
  return (
    <Styled.Box>
      <Styled.Loading>
        <span></span>
        <span></span>
      </Styled.Loading>
      <Logo />
    </Styled.Box>
  );
}
