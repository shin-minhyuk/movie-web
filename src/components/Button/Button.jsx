import { useDispatch, useSelector } from "react-redux";
import * as Styled from "./Button.styled";
import { isModal } from "../../RTK/modalSlice";

export default function Button({
  children,
  position = "header",
  color = "red",
}) {
  const dispatch = useDispatch();

  return (
    <>
      <Styled.G_Button
        onClick={() => dispatch(isModal(true))}
        $position={position}
        color={color}
      >
        {children}
      </Styled.G_Button>
    </>
  );
}
