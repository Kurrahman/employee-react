export default function SearchBar({disabled=false, onSubmit=()=>{}, onChange=()=>{}}) {  
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      onSubmit(e)
    }}>
      <input
        disabled={disabled}
        className="
          rounded-full px-3 mb-3 
        bg-green-50
          border-2 border-green-700 
          focus:outline-none focus:ring focus:ring-green-300
          disabled:border-gray-500 disabled:bg-gray-50
          placeholder:italic"
        placeholder="Employee Name"
        onChange={(e) => { onChange(e) }}
      />
      <button type="submit" />
    </form>
  )
}