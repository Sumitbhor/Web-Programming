var emp = require('./employee')
class SalesEmployee extends Employee {
    constructor(id, name, basicsalary, hra, tax, commission) {
        super(id, name, basicSalary, hra, tax);
        this.commission = commission;
    }

    computePay() {
        return super.computePay() + this.commission
    }

    doWork() {
        console.log("SalesEmployee is working ")
    }
    conductTraining() {
        console.log("SalesEmployee conducting training session.");
    }

    conductHandsOnSession() {
        console.log("SalesEmployee conducting hands-on session.");
    }

}
module.exports = SalesEmployee;