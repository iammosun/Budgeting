

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




// Main Class for the App
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



    // adding up the Income values at the table
    calcIncTotal() {

        this.incTot = 0;

        const incValues = document.querySelectorAll('.income-ul .ul-amnt-value');
        this.incVals = incValues;

        this.incVals.forEach((incVal) => {
            this.incTot = parseFloat(this.incTot) + parseFloat(incVal.innerHTML);
        });
    }



    // updating the Total Income at the top section
    incomeTotal() {

        this.calcIncTotal();

        totalIncValue.innerHTML = parseFloat(this.incTot).toFixed(2);
    }



    // adding up the Expenses and percentage values at the table
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



    // calculating percentages at the table and adding them to the Total percentage
    calcEachPercent(exp) {

        let calcPercent = (parseFloat(exp.innerHTML) * 100) / parseFloat(this.incTot);
        let percentValue = exp.parentElement.nextElementSibling;

        // avoiding percentage values less than 0
        if (calcPercent == 'Infinity') {

            percentValue.innerHTML = '--';
            this.percentTot = 0;

        } else {

            percentValue.innerHTML = parseFloat(calcPercent).toFixed(1) + "%";

            // adding the list percentage to the total percentage
            this.percentTot = parseFloat(this.percentTot) + parseFloat(calcPercent);
        }
    }



    // updating the Total Expenses and Total Percentage at the top section
    expensesTotal() {

        this.calcExpTotal();

        totalExpValue.innerHTML = parseFloat(this.expTot).toFixed(2);
        totalPercentValue.innerHTML = parseFloat(this.percentTot).toFixed(1) + '%';

    }



    // calculating the FINAL BALANCE at the top section
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



    // this is the method called to update the OVERALL Budget
    updateBudget() {

        this.incomeTotal();
        this.expensesTotal();
        this.finalBalance();

    }



    // Reseting/Clearing all forms when SUBMIT button is clicked
    reset() {

        document.forms['user-input-area'].reset();

    }



    // deleting list when the DELETE button is clicked
    delete(e) {

        e.target.closest('li').remove();
        this.updateBudget();

    };

    
    




    /* collecting user inputted values and adding them to the DOM==============
    ===========================================================================*/
    submitUserInfo(e) {

        e.preventDefault();

        // storing the user inputted values
        let userAmntInput = userValue.querySelector('input').value;
        let userdescriptionInput = addDescription.querySelector('input').value;



        // creating new elements for the income and expenses lists
        const ulList = document.createElement('li');
        const ulListItem = document.createElement('span');
        const ulCalcContainer = document.createElement('span');
        const ulAmntContainer = document.createElement('span');
        const ulDeleteBtn = document.createElement('img');
        const sign = document.createElement('span');
        const ulAmntValue = document.createElement('span');
        const ulPercent = document.createElement('span');



        // adding classes to the newly created elements
        ulList.classList.add('details-container');
        ulListItem.classList.add('list-item');
        ulCalcContainer.classList.add('calc-container');
        ulAmntContainer.classList.add('ul-amnt-container');
        sign.classList.add('sign');
        ulAmntValue.classList.add('ul-amnt-value');
        ulPercent.classList.add('percent-calc');
        ulDeleteBtn.classList.add('delete-btn');
        ulDeleteBtn.setAttribute('src', 'images/bin.png');



        // appending the new elements to the document
        ulAmntContainer.appendChild(sign);
        ulAmntContainer.appendChild(ulAmntValue);
        ulCalcContainer.appendChild(ulAmntContainer);
        ulCalcContainer.appendChild(ulPercent);
        ulCalcContainer.appendChild(ulDeleteBtn);
        ulList.appendChild(ulListItem);
        ulList.appendChild(ulCalcContainer);



        // avoiding any empty or below 1 user input
        if ((userAmntInput >= 1) && (userdescriptionInput.length > 0)) {

            ulAmntValue.innerHTML = parseFloat(userAmntInput).toFixed(2);
            ulListItem.innerHTML = userdescriptionInput;

            // check the sign and append info to DOM
            this.signCheck(ulList);

            this.reset();

        } else {
            alert("Please insert valid inputs");
        }

        this.updateBudget();

        ulDeleteBtn.addEventListener('click', this.delete.bind(this));

    };



    signCheck(ul) {
        if (signDropdown.value == "plus") {

            // appending info to Income table
            incomeTable.appendChild(ul);

        } else {

            // appending info to Exp table
            expensesTable.appendChild(ul);

        }
    }
};
    


const budget1 = new Budget();