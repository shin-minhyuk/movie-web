import { InputWrapper } from './style'

export default function CommonInput({
  placeholder,
  type = 'text',
  name,
  onChange,
  value,
  error,
}) {
  return (
    <InputWrapper>
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        value={value[name]}
        onChange={onChange}
        className={error[name] ? 'error' : null}
        autoComplete="off"
      />
      <p>{error[name] || ''}</p>
    </InputWrapper>
  )
}
