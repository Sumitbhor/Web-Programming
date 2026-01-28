
var SalesEmployee = require('./salesemployee');
class SalesManager extends SalesEmployee {

    constructor(id, name, basicSalary, hra, tax, commission, bonus) {
        super(id, name, basicSalary, hra, tax, commission);
        this.bonus = bonus;
    }
    computePay() {
        return super.computePay() + this.bonus;
    }
    doWork() {
        console.log("SalesManager is working.");
    }
    conductTraining() {
        console.log("SalesManager conducting training session.");
    }
    conductHandsOnSession() {
        console.log("SalesManager conducting hands-on session.");
    }
}

module.exports = SalesManager;