export default class Employee {
  id
  name
  manager
  report

  constructor(id, name){
    this.id = id
    this.name = name.charAt(0).toUpperCase() + name.slice(1)
    this.manager = null
    this.report = null
  }

  setManager(manager){
    this.manager = manager
  }

  addReport(employee){
    if (!this.report){
      this.report = [employee]
    } else {
      this.report.push(employee)
    }
  }

  getAllManager(){
    var out = ''
    if (this.manager){
      out = `${this.manager.recurseManager()}`
    } else {
      out = '-'
    }
    return out
  }

  recurseManager(){
    var out = this.name
    if (this.manager){
      out += ' -> ' + this.manager.recurseManager()
    }
    return out
  }

  getTotalReport(){
    var out = 0
    if (this.report){
      this.report.forEach(rep => {
        out += 1 + rep.getTotalReport()
      });
    }
    return out
  }

  isValid(){
    return (this.manager || this.report)
  }
}