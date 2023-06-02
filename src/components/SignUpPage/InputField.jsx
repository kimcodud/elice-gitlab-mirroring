// eslint-disable-next-line react/prop-types
const InputField = ({ label, type, value, onChange, required }) => {
  return (
    <label className="block mb-2">
      <span className="block mb-1">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-1 border-b-2 outline-none border-b-violet-400"
      />
    </label>
  );
};

export default InputField;
