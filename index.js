const loanCalcs = require('loan-calculations');
const loanCalc = require('loan-calc');
const amortization = require('amortization');
// const finance = require('node-finance');

(async () =>   { 
    let result = await loanCalcs.getInstallment(18335, 0.12, 18);
    console.log(result);
})();

let res = loanCalc.paymentCalc({
    amount: 18335,
    rate: 12,
    termMonths: 21
});

console.log(res);


let schedule = amortization.amortizationSchedule(18335, 2, 12);

console.log(schedule);
// console.log(result());
