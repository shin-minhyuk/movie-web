import { useDispatch, useSelector } from "react-redux";
import * as Styled from "./Button.styled";
import { modalSlice } from "../../RTK/modalSlice";

export default function Button({ children, type = "header", color = "red" }) {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  return (
    <>
      <Styled.G_Button
        onClick={() => dispatch(modalSlice.actions.isModal(true))}
        type={type}
        color={color}
      >
        {children}
      </Styled.G_Button>
    </>
  );
}
