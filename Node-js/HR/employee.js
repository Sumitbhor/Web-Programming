class Employee {
    constructor (id, name , basicSalary ,hra ,tax){
        this.id = id ;
        this.name= name ;
        this.basicSalary = basicSalary
        this.hra = hra ; 
        this.tax = tax ; 
    }

    computePay(){
        return this.basicSalary + this.hra - this.tax
    }

    doWork(){
        throw new Error ('Method "doWork()"must be implemented ')
    }
}
module.exports = Employee