import { useState } from "react"

export default function FileInput({label='', onChange=()=>{}}) {
  const [fileLoaded, setFileLoaded] = useState(false)
  const [fileName, setFileName] = useState('')

  function handleFileChange(e){
    setFileLoaded(true)
    var tmpDir = e.target.value.split('\\')
    setFileName(tmpDir[tmpDir.length - 1])
    onChange(e)
  }

  return (
    <label className="
        absolute bottom-6 py-1 px-3 rounded-lg
        bg-green-50 border-2 border-green-700
        hover:bg-green-200
        focus:outline-none focus:ring focus:ring-green-300
        cursor-pointer
      ">
      {fileLoaded ? fileName : label}
      <input onChange={(e) => { handleFileChange(e) }} type="file" hidden />
    </label>
  )
}