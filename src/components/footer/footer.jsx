import Logo from "../Logo";
import Navigation from "../navigation";
import * as Styled from "./footer.styled";

function Footer() {
  return (
    <Styled.Footer className="footer_container">
      <Logo />
      <nav className="nav_container">
        <Navigation />
      </nav>
    </Styled.Footer>
  );
}

export default Footer;
