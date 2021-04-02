
/*====================================================================================================
In Html, Uncomment ""<script src="js/scriptFP.js" defer></script>"" instead for functional programming
=====================================================================================================*/


// Global Constants
const totalIncValue = document.querySelector('.total-inc-value');
const totalExpValue = document.querySelector('.total-exp-value');
const totalPercentValue = document.querySelector('.total-percent');
const finalBal = document.querySelector('.final-balance');
const finalBalSign = document.querySelector('#final-bal-container .sign');
const signDropdown = document.getElementById('sign-dropdown');
const addDescription = document.querySelector('#add-description');
const userDescription = document.querySelector('.add-description');
const userValue = document.querySelector('#value');
const submitBtn = document.querySelector('.submit-btn');
const incomeUl = document.querySelector('.income-ul');
const expensesUl = document.querySelector('.expenses-ul');
const h2s = document.querySelectorAll('h2');




// MAIN CLASS
class Budget {

    incTot;
    expTot;
    percentTot;
    userAmntInput;
    userdescriptionInput;

    constructor() {
        submitBtn.addEventListener('click', this.submitUserInfo.bind(this));
    }





    // =====================================================UPDATING BUDGET=

    // add up Income values at the table
    calcIncTotal() {
        this.incTot = 0;
        this.incVals = document.querySelectorAll('.income-ul .ul-amnt-value');

        this.incVals.forEach((incVal) => {
            this.incTot = parseFloat(this.incTot) + parseFloat(incVal.innerHTML);
        });
    }


    // update Total Income at the top section
    incomeTotal() {
        this.calcIncTotal();

        totalIncValue.innerHTML = parseFloat(this.incTot).toFixed(2);
    }


    // add up Expenses and percentage values at the table
    calcExpTotal() {
        this.expTot = 0;
        this.percentTot = 0;

        const expVals = document.querySelectorAll('.expenses-ul .ul-amnt-value');

        expVals.forEach((expVal) => {
            this.expTot = parseFloat(this.expTot) + parseFloat(expVal.innerHTML);
            this.calcEachPercent(expVal);
        });
    }


    // calculate percentages at the table and add them to the Total percentage
    calcEachPercent(exp) {
        let calcPercent = (parseFloat(exp.innerHTML) * 100) / parseFloat(this.incTot);
        let percentValue = exp.parentElement.nextElementSibling;

        // avoid percentage values less than 0
        if (calcPercent == 'Infinity') {

            percentValue.innerHTML = '--';
            this.percentTot = 0;

        } else {

            percentValue.innerHTML = parseFloat(calcPercent).toFixed(1) + "%";

            // add list percentage to the total percentage
            this.percentTot = parseFloat(this.percentTot) + parseFloat(calcPercent);
        }
    }


    // update Total Expenses and Total Percentage at the top section
    expensesTotal() {
        this.calcExpTotal();

        totalExpValue.innerHTML = parseFloat(this.expTot).toFixed(2);
        totalPercentValue.innerHTML = parseFloat(this.percentTot).toFixed(1) + '%';
    }


    // calculate FINAL BALANCE at the top section
    finalBalance() {
        let finalBalance = parseFloat(totalIncValue.innerHTML) - parseFloat(totalExpValue.innerHTML);

        if (parseFloat(finalBalance) > 0) {
            finalBalSign.innerHTML = '+';
        }

        if (parseFloat(finalBalance) < 0) {
            finalBalance *= -1;
            finalBalSign.innerHTML = '-';
        }

        finalBal.innerHTML = parseFloat(finalBalance).toFixed(2);
    }


    // Update OVERALL Budget
    updateBudget() {
        this.incomeTotal();
        this.expensesTotal();
        this.finalBalance();
    }






    // ====================================COLLECT USER INFO + UPDATE BUDGET=

    // Reset/Clear forms when SUBMIT button is clicked
    resetForms() {
        document.forms['user-input-area'].reset();
    }


    // delete li
    delete(e) {
        e.target.closest('li').remove();
        this.updateBudget();
    };


    appendUserDataToDOM() {
        // create new list
        const newLi = `
            <li class="table-li details-container" >
                <span class="list-item">${this.userdescriptionInput}</span>
                <span class="calc-container">
                    <span class="ul-amnt-container">
                        <span class="sign"></span>
                        <span class="amount ul-amnt-value">${this.userAmntInput}</span>
                    </span>
                    <span class="percent-calc"></span>
                    <img class="delete-btn" src="images/bin.png">
                </span>
            </li>
            `;

        // check sign + append list to the ul + push values
        if (signDropdown.value == "plus") {

            incomeUl.innerHTML += newLi;

        } else {

            expensesUl.innerHTML += newLi;

        }
    }


    submitUserInfo(e) {
        e.preventDefault();

        // store the user inputs
        this.userAmntInput = userValue.querySelector('input').value;
        this.userdescriptionInput = addDescription.querySelector('input').value;
        
        // validate user inputs
        if (
            (this.userAmntInput >= 1) &&
            (this.userdescriptionInput.length > 0) &&
            !(this.userdescriptionInput === "")
        ){

            this.appendUserDataToDOM();
            this.resetForms();
            this.updateBudget();

        } else {
            alert("Enter valid inputs!");
        };



        // delete list when DELETE button is clicked
        const deleteBtns = document.querySelectorAll(".delete-btn");
        
        deleteBtns.forEach((btn) => {
            btn.addEventListener('click', this.delete.bind(this));
        });
    };  
};


const budget1 = new Budget();