export default function SearchBar({disabled=false, placeholder='', onSubmit=()=>{}, onChange=()=>{}, ...otherProps}) {  
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      onSubmit(e.target.children[0].value)
    }}>
      <input
        data-testid={'searchBar'}
        disabled={disabled}
        className="
          rounded-full px-3 mb-3 
        bg-green-50
          border-2 border-green-700 
          focus:outline-none focus:ring focus:ring-green-300
          disabled:border-gray-500 disabled:bg-gray-50
          placeholder:italic"
        placeholder={placeholder}
        onChange={(e) => { onChange(e.target.value) }}
        {...otherProps}
      />
      <button type="submit" />
    </form>
  )
}