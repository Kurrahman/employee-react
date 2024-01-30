import { useState } from "react";
import SearchBar from "./components/SearchBar";
import FileInput from "./components/FileInput";
import { useEmployee } from "./hooks/useEmployee";

function App() {
  const [fileLoaded, setFileLoaded] = useState(false)
  const [employeeFile, setEmployeeFile] = useState()
  const [status, employeeMap, employeeSearchMap] = useEmployee(employeeFile)
  const [searchQuery, setSearchQuery] = useState('')
  const [submitSearch, setSubmitSearch] = useState(false)

  function resetForm() {
    setSearchQuery('')
    setSubmitSearch(false)
  }

  function isErrorFound() {
    return status && status !== 'success'
  }

  function searchEmployee(query) {
    return employeeSearchMap.get(query.toLowerCase())
  }

  function handleSelectFile(files) {
    if (files) {
      var file = files[0]
      var reader = new FileReader()
      reader.onload = event => {
        setEmployeeFile(event.target.result)
        setFileLoaded(true)
        resetForm()
      }
      reader.readAsText(file)
    }
  }

  function handleSubmitForm(s) {
    setSearchQuery(s)
    setSubmitSearch(true)
  }

  return (
    <div className="flex flex-col items-center pt-10 h-screen relative bg-green-100 text-green-900">
      <header className="mb-3 text-xl font-semibold">
        {`Employee Search`}
      </header>
      <SearchBar disabled={isErrorFound()} placeholder="Employee Name" onSubmit={handleSubmitForm} />
      {/* error on loading file */}
      {fileLoaded && 
        (
          isErrorFound() 
          ?
            <LoadFailedMessage employeeMap={employeeMap} message={status}/>
          :
            <LoadSuccessMessage/>
        )
      }
      {/* found result */}
      {employeeSearchMap && (searchQuery !== '') && submitSearch &&
        <SearchResult employee={searchEmployee(searchQuery)} />
      }
      <FileInput label="Upload Employee File" onChange={handleSelectFile} />
    </div>
  );
}

function LoadSuccessMessage() {
  return (
    <div className="text-center text-green-500">
      <p>
        {'Employee file successfully loaded'}
      </p>
    </div>
  )
}

function LoadFailedMessage({ message, employeeMap }) {
  return (
    <div className="text-center text-red-500">
      <p>
        {`Unable to process employee hierarchy`}
      </p>
      <p>
        {message}
      </p>
      {Array.from(employeeMap.values()).map((employee) => (
        <p key={employee.name} className="text-lg font-semibold">
          {employee.name}
        </p>
      ))}
    </div>
  )
}

function SearchResult({ employee }) {
  return (
    <div>
      {employee
        ?
        <div>
          <p>
            {`Found : ${employee.name}`}
          </p>
          <p>
            {`Managed by : ${employee.getAllManager()}`}
          </p>
          <p>
            {`Total report(s) : ${employee.getTotalReport()}`}
          </p>
        </div>
        :
        <div>
          <p>
            {`Employee not found`}
          </p>
        </div>
      }
    </div>
  )
}

export default App;
