function Input({ value, handleOnChange, ...props }) {
  return (
    <input
      type='text'
      placeholder='Type here'
      value={value}
      onChange={handleOnChange}
      {...props}
    />
  );
}

export default Input;
