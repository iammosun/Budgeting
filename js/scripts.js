
/* constants====================================================================
==============================================================================*/
const totalIncValue = document.querySelector('.total-inc-value');
const totalExpValue = document.querySelector('.total-exp-value');
const totalPercentValue = document.querySelector('.total-percent');
const finalBal = document.querySelector('.final-balance');
const finalBalSign = document.querySelector('#final-bal-container .sign');
const signDropdown = document.getElementById('sign-dropdown');
const addDescription = document.querySelector('#add-description');
const userValue = document.querySelector('#value');
const submitBtn = document.querySelector('.submit-btn');
const incomeTable = document.querySelector('.income-ul');
const expensesTable = document.querySelector('.expenses-ul');
const h2s = document.querySelectorAll('h2');





/*this function does all Calculations in the budget=============================
==============================================================================*/
function calculateBudgets(){

  // Arrays containing all values of the Inc and Exp table======================
  const incValues = document.querySelectorAll('.income-ul .ul-amnt-value');
  const expValues = document.querySelectorAll('.expenses-ul .ul-amnt-value');
  const ulPercents = document.querySelectorAll('.expenses-ul .percent-calc');



  // to calculate the "Total Income" at the top section=========================
  let incTotal = 0;
  function calcIncTotal(){
    incValues.forEach(function(incValue){
      incTotal = parseFloat(incTotal) + parseFloat(incValue.innerHTML);
    });
    return incTotal;
  }
  calcIncTotal();
  totalIncValue.innerHTML = parseFloat(incTotal).toFixed(2);



  // to calculate Total Expenses, Percentages & Total Percentage================
  let expTotal = 0;
  let percentTotal = 0;
  function calcExpTotal(){
    expValues.forEach(function(expValue){
      expTotal = parseFloat(expTotal) + parseFloat(expValue.innerHTML);

      // to calculate the percentage for each Exp value=========================
      let calcPercent = (parseFloat(expValue.innerHTML) * 100) / parseFloat(incTotal);
      let percentValue = expValue.parentElement.nextElementSibling;

      // avoiding percentage values less than 0=================================
      if (calcPercent == 'Infinity'){
        percentValue.innerHTML = '--';
        percentTotal = 0;
      }else{
        percentValue.innerHTML = parseFloat(calcPercent).toFixed(1) + "%";
        percentTotal = parseFloat(percentTotal) + parseFloat(calcPercent);
      }
    });
  }

  calcExpTotal();
  totalExpValue.innerHTML = parseFloat(expTotal).toFixed(2);
  totalPercentValue.innerHTML = parseFloat(percentTotal).toFixed(1) + '%';



  // to calculate the FINAL BALANCE at the top section==========================
  let finalBalance = parseFloat(totalIncValue.innerHTML) - parseFloat(totalExpValue.innerHTML);
  if (parseFloat(finalBalance) > 0){
    finalBalSign.innerHTML = '+';
  }else{
    finalBalance *= -1;
    finalBalSign.innerHTML = '-';
  }

  finalBal.innerHTML = parseFloat(finalBalance).toFixed(2);
}






/*this function adds User inputed info to either the Inc Table or Exp Table ====
==============================================================================*/
submitBtn.addEventListener('click', submitInfo);
function submitInfo(){
  //to obtain the values of the description and amount the user has imputed=====
  let userAmntInput = userValue.querySelector('input').value;
  let userdescriptionInput = addDescription.querySelector('input').value;



  // to create new elements for the income and expenses lists===================
  const ulList = document.createElement('li');
  const ulListItem = document.createElement('span');
  const ulCalcContainer = document.createElement('span');
  const ulAmntContainer = document.createElement('span');
  const ulDeleteBtn = document.createElement('img');
  const sign = document.createElement('span');
  const ulAmntValue = document.createElement('span');
  const ulPercent = document.createElement('span');



  // to add classes to the newly created elements===============================
  ulList.classList.add('details-container');
  ulListItem.classList.add('list-item');
  ulCalcContainer.classList.add('calc-container');
  ulAmntContainer.classList.add('ul-amnt-container');
  sign.classList.add('sign');
  ulAmntValue.classList.add('ul-amnt-value');
  ulPercent.classList.add('percent-calc');
  ulDeleteBtn.classList.add('delete-btn');
  ulDeleteBtn.setAttribute('src', 'images/bin.png');



  // to append the new elements to the document=================================
  ulAmntContainer.appendChild(sign);
  ulAmntContainer.appendChild(ulAmntValue);
  ulCalcContainer.appendChild(ulAmntContainer);
  ulCalcContainer.appendChild(ulPercent);
  ulCalcContainer.appendChild(ulDeleteBtn);
  ulList.appendChild(ulListItem);
  ulList.appendChild(ulCalcContainer);



  // this if statement is to avoid any empty or below 1 user input==============
  if ((userAmntInput >= 1) && (userdescriptionInput.length > 0)){

    // this if statement is checking if the user has selected the + or - sign===
    if (signDropdown.value == "plus"){

      //to append the user inputed info to the Income table====================
      ulAmntValue.innerHTML = parseFloat(userAmntInput).toFixed(2);
      ulListItem.innerHTML = userdescriptionInput;
      incomeTable.appendChild(ulList);

      calculateBudgets();

    }else{

      //to append the user inputed info to the Exp table========================
      ulAmntValue.innerHTML = parseFloat(userAmntInput).toFixed(2);
      ulListItem.innerHTML = userdescriptionInput;
      expensesTable.appendChild(ulList);

      calculateBudgets();
    }

  }else{
    alert("PLease insert description and a value not less than 1");
  }



  //to delete the list when the DELETE button is clicked========================
  ulDeleteBtn.addEventListener('click', function(e){
    e.target.closest('li').remove();
    calculateBudgets();
  });



  // to Reset/Clear all forms after the submit button is clicked================
  document.forms['user-input-area'].reset();
}
