import { useEffect, useState } from "react";
import { loadEmployeeFromJson } from "./utils/loadEmployee";

function App() {
  const [fileLoaded, setFileLoaded] = useState(false)
  const [fileName, setFileName] = useState('')
  const [employeeFile, setEmployeeFile] = useState()
  const [employeeMap, setEmployeeMap] = useState()
  const [employeeSearchMap, setEmployeeSearchMap] = useState()
  const [errorFound, setErrorFound] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const [searchQuery, setSearchQuery] = useState('')
  const [submitSearch, setSubmitSearch] = useState(false)

  function handleSelectFile(event) {
    if (event.target.files) {
      var file = event.target.files[0]
      var reader = new FileReader()
      var tmpDir = event.target.value.split('\\')
      setFileName(tmpDir[tmpDir.length - 1])
      reader.onload = event => {
        setEmployeeFile(event.target.result)
        setFileLoaded(true)
        setSearchQuery('')
        setSubmitSearch(false)
        setErrorMessage()
        setErrorFound()
      }
      reader.readAsText(file)
    }
  }

  useEffect(() => {
    if (employeeFile) {
      var [status, tmpEmployeeMap] = loadEmployeeFromJson(employeeFile)
      if (status !== 'success') {
        setErrorFound(true)
        setErrorMessage(status)
      } else {
        setErrorFound(false)
        var tmpSearchMap = new Map()
        tmpEmployeeMap.forEach(employee => {
          tmpSearchMap.set(employee.name.toLowerCase(), employee)
        })
        setEmployeeSearchMap(tmpSearchMap)
      }
      setEmployeeMap(tmpEmployeeMap)
    }
  }, [employeeFile])

  return (
    <div className="flex flex-col items-center pt-10 h-screen relative bg-green-100 text-green-900">
      <header className="mb-3 text-xl font-semibold">
        Employee Search
      </header>
      <form onSubmit={(e) => {
        e.preventDefault()
        setSubmitSearch(true)
      }}>
        <input
          className="
            rounded-full px-3 mb-3 
          bg-green-50
            border-2 border-green-700 
            focus:outline-none focus:ring focus:ring-green-300
            placeholder:italic"
          placeholder="Employee Name"
          onChange={(e) => { setSearchQuery(e.target.value.toLowerCase()); setSubmitSearch(false) }}
        />
        <button type="submit"/>
      </form>
      {/* error result */}
      {errorFound &&
        <div className="text-center text-red-500">
          <p>
            {`Unable to process employee hierarchy`}
          </p>
          <p>
            {errorMessage}
          </p>
          {Array.from(employeeMap.values()).map((employee) => (
            <p className="text-lg font-semibold">
              {employee.name}
            </p>
          ))}
        </div>
      }
      {!errorFound && fileLoaded && 
        <div className="text-center text-green-500">
          <p>
            {'Employee file successfully loaded'}
          </p>
        </div>
      }
      {/* found result */}
      {employeeSearchMap && (searchQuery !== '') &&
        <div>
          {employeeSearchMap.get(searchQuery) 
            ?
            <div>
              <p>
                {`Found : ${employeeSearchMap.get(searchQuery)?.name}`}
              </p>
              <p>
                {`Managed by : ${employeeSearchMap.get(searchQuery)?.getAllManager()}`}
              </p>
              <p>
                {`Total report(s) : ${employeeSearchMap.get(searchQuery)?.getTotalReport()}`}
              </p>
            </div>
            :
            <div>
              { submitSearch &&
                <p>
                  {`Employee not found`}
                </p>
              }
            </div>
          }
        </div>
      }
      <label className="
        absolute bottom-6 py-1 px-3 rounded-lg
        bg-green-50 border-2 border-green-700
        hover:bg-green-200
        focus:outline-none focus:ring focus:ring-green-300
        cursor-pointer
      ">
        {fileLoaded ? fileName : 'Upload Employee File'}
        <input onChange={(e) => { handleSelectFile(e) }} type="file" hidden />
      </label>
    </div>
  );
}

export default App;
