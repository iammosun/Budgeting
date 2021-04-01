

/*====================================================================================
For Functional Programming, uncomment ""<script src="js/scriptFP.js" defer></script>""
 in the Html and comment the scriptOOP out instead.
======================================================================================*/


//==================Global Constants==================================================
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
const incomeTable = document.querySelector('.income-ul');
const expensesTable = document.querySelector('.expenses-ul');
const h2s = document.querySelectorAll('h2');




// ===================================MAIN APP CLASS==================================
class Budget {

    incVals = [];
    expVals = [];
    ulPercent = [];
    incTot;
    expTot;
    percentTot;


    constructor() {

        submitBtn.addEventListener('click', this.submitUserInfo.bind(this));

    }



    // add up Income values at the table
    calcIncTotal() {

        this.incTot = 0;

        const incValues = document.querySelectorAll('.income-ul .ul-amnt-value');
        this.incVals = incValues;

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

        const expValues = document.querySelectorAll('.expenses-ul .ul-amnt-value');
        this.expVals = expValues;
      
        this.expVals.forEach((expValue) => {

            this.expTot = parseFloat(this.expTot) + parseFloat(expValue.innerHTML);
            this.calcEachPercent(expValue);

        });

    }



    // calculate percentages at the table and adding them to the Total percentage
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



    // Method called to update the OVERALL Budget
    updateBudget() {

        this.incomeTotal();
        this.expensesTotal();
        this.finalBalance();

    }



    // Reset/Clear all forms when SUBMIT button is clicked
    reset() {

        document.forms['user-input-area'].reset();

    }



    // delete list when DELETE button is clicked
    delete(e) {

        e.target.closest('li').remove();
        this.updateBudget();

    };

    
    




    /* collecting user inputted values and adding them to the DOM==============
    ===========================================================================*/
    submitUserInfo(e) {

        e.preventDefault();

        // store the user inputs
        let userAmntInput = userValue.querySelector('input').value;
        let userdescriptionInput = addDescription.querySelector('input').value;



        // create new elements for the income and expenses lists
        const ulList = document.createElement('li');
        const ulListItem = document.createElement('span');
        const ulCalcContainer = document.createElement('span');
        const ulAmntContainer = document.createElement('span');
        const ulDeleteBtn = document.createElement('img');
        const sign = document.createElement('span');
        const ulAmntValue = document.createElement('span');
        const ulPercent = document.createElement('span');



        // add classes to the newly created elements
        ulList.classList.add('details-container');
        ulListItem.classList.add('list-item');
        ulCalcContainer.classList.add('calc-container');
        ulAmntContainer.classList.add('ul-amnt-container');
        sign.classList.add('sign');
        ulAmntValue.classList.add('ul-amnt-value');
        ulPercent.classList.add('percent-calc');
        ulDeleteBtn.classList.add('delete-btn');
        ulDeleteBtn.setAttribute('src', 'images/bin.png');



        // append the new elements to the document
        ulAmntContainer.appendChild(sign);
        ulAmntContainer.appendChild(ulAmntValue);
        ulCalcContainer.appendChild(ulAmntContainer);
        ulCalcContainer.appendChild(ulPercent);
        ulCalcContainer.appendChild(ulDeleteBtn);
        ulList.appendChild(ulListItem);
        ulList.appendChild(ulCalcContainer);



        // avoid any empty or below 1 user input
        if ((userAmntInput >= 1) && (userdescriptionInput.length > 0)) {

            ulAmntValue.innerHTML = parseFloat(userAmntInput).toFixed(2);
            ulListItem.innerHTML = userdescriptionInput;

            // check the sign and append info to DOM
            this.appendToDOM(ulList);

            this.reset();

        } else {
            alert("Enter valid inputs!");
        }

        this.updateBudget();

        ulDeleteBtn.addEventListener('click', this.delete.bind(this));

    };



    appendToDOM(ul) {
        if (signDropdown.value == "plus") {

            // append info to Income table
            incomeTable.appendChild(ul);

        } else {

            // append info to Exp table
            expensesTable.appendChild(ul);

        }
    }
};
    


const budget1 = new Budget();