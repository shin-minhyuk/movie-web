import * as Styled from './style'

export default function Button({
  text,
  position = 'header',
  color = 'red',
  onClick,
}) {
  return (
    <>
      <Styled.ButtonWrapper
        onClick={onClick}
        $position={position}
        color={color}
      >
        <button type="button">{text}</button>
      </Styled.ButtonWrapper>
    </>
  )
}
