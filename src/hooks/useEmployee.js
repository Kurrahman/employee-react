import { useEffect, useState } from "react"
import { loadEmployeeFromJson } from "../utils/loadEmployee"

export function useEmployee(employeeFile) {
  const [employeeMap, setEmployeeMap] = useState(new Map())
  const [employeeSearchMap, setEmployeeSearchMap] = useState(new Map())
  const [status, setStatus] = useState()

  useEffect(() => {
    if (employeeFile) {
      var [loadStatus, loadEmployeeMap] = loadEmployeeFromJson(employeeFile)
      if (loadStatus === 'success') {
        var tmpSearchMap = new Map()
        loadEmployeeMap.forEach(employee => {
          tmpSearchMap.set(employee.name.toLowerCase(), employee)
        })
        setEmployeeSearchMap(tmpSearchMap)
      }
      setStatus(loadStatus)
      setEmployeeMap(loadEmployeeMap)
    }
  }, [employeeFile])

  return [status, employeeMap, employeeSearchMap]
}