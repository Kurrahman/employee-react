import Employee from "../classes/Employee"

export function loadEmployeeFromJson(str){
  var employees = JSON.parse(str)
  var out = new Map()

  // initialize
  employees.forEach(employee => {
    out.set(employee.id, new Employee(employee.id, employee.name))
  })

  // set managers and reports
  employees.forEach(employee => {
    var tmp = out.get(employee.id)
    if (employee.managerId){
      var manager = out.get(employee.managerId)
      tmp.setManager(manager)
      manager.addReport(tmp)
    }
  })

  // check employees validity
  var flag = false
  var errOut = new Map()
  employees.forEach(employee => {
    var tmp = out.get(employee.id)
    if (!tmp.isValid()){
      errOut.set(employee.id, tmp)
      flag = true
    }
  })

  // return
  if (flag) {
    return ['failed', errOut]
  }
  return ['success', out]
}