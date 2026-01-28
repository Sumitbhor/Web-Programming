import Employee from "./employee";
import SalesEmployee from "./salesemployee";
import SalesManager from "./salesmanager";
import IAppraisable from "./Interface/IApprisable";
import ITrainer from "./Interface/ITrainer";

var emptype=typeof Employee;
console.log(emptype);

var salesemptype=typeof SalesEmployee;
console.log(salesemptype);

var salesmanagertype=typeof SalesManager;
console.log(salesmanagertype);

var num =42;
var numtype=typeof num;
console.log(numtype);

var emp = new Employee(1, "jonh Doe", 50000, 1000, 5000,)
console.log(`Employee pay : ${emp.compute()}`)
emp.computePay();

var salesMgr = new SalesEmployee(3, "sanika ", 50000,200,2)
console.log(`sales manager pay : ${salesMgr.computePay()}`)
salesMgr.doWork() ;

Object.assign(SalesManager.prototype , IAppraisable.prototype)
Object.assign(SalesManager.prototype ,ITrainer.prototype)

const staff=[
    new SalesEmployee(1, "Amit", 25000,5000,500,100),
    new SalesManager (2, "neha", 500000,220,4444,55555,5555)
]
