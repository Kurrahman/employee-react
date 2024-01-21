import Employee from "../classes/Employee"

export function loadEmployeeFromJson(str) {
  var employees = JSON.parse(str)
  var out = new Map()
  var flag = false
  var errOut = new Map()
  var errMsg = ''

  // initialize
  employees.forEach(employee => {
    if (out.get(employee.id)){
      flag = true
      errMsg = 'Duplicate ID found'
    }
    out.set(employee.id, new Employee(employee.id, employee.name))
  })

  if (!flag){
    // set managers and reports
    employees.forEach(employee => {
      var tmp = out.get(employee.id)
      if (employee.managerId) {
        if (employee.managerId === employee.id){
          flag = true
          errMsg = 'An Employee cannot be his/her own manager'
          errOut.set(employee)
        } else {
          var manager = out.get(employee.managerId)
          if (manager){
            tmp.setManager(manager)
            manager.addReport(tmp)
          } else {
            flag = true
            errMsg = 'The following employees\' manager does not exist'
            errOut.set(employee.id, new Employee(employee.id, employee.name))
          }
        }
      }
    })
    if (!flag){
      // check employees validity
      employees.forEach(employee => {
        var tmp = out.get(employee.id)
        if (!tmp.isValid()) {
          errOut.set(employee.id, tmp)
          flag = true
          errMsg = 'The following employee(s) does not have any hierarchy'
        }
        if (tmp.checkCycle(employees.length)){
          flag = true
          errMsg = 'Cyclical hierarchy found'
          return [errMsg, new Map()]
        }
      })
    }
  }


  // return
  if (flag) {
    return [errMsg, errOut]
  }
  return ['success', out]
}