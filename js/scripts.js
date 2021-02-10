// constants====================================================================
const totalIncValue = document.querySelector('.total-inc-value');
const totalExpValue = document.querySelector('.total-exp-value');
const totalPercentValue = document.querySelector('.total-percent');
const finalBal = document.querySelector('.final-balance');
const signDropdown = document.getElementById('sign-dropdown');
const addDescription = document.querySelector('#add-description');
const userValue = document.querySelector('#value');
const submitBtn = document.querySelector('.submit-btn');
const incomeTable = document.querySelector('.income-ul');
const expensesTable = document.querySelector('.expenses-ul');





// function for all the calculations in the budget==============================
function calcAllBudget(){

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

  function calcExpTotal(){
    let percentTotal = 0;

    expValues.forEach(function(expValue){

      expTotal = parseFloat(expTotal) + parseFloat(expValue.innerHTML);


      // to calculate the percentage for each Exp value=========================
      let calcPercent = (parseFloat(expValue.innerHTML) * 100) / parseFloat(incTotal);
      let percentValue = expValue.nextElementSibling;
      percentValue.innerHTML = parseFloat(calcPercent).toFixed(1) + "%";


      // to calculate the total percentage at the top section===================
      percentTotal = parseFloat(percentTotal) + parseFloat(calcPercent);
      totalPercentValue.innerHTML = parseFloat(percentTotal).toFixed(1) + '%';

    });
    return expTotal;
  }

  calcExpTotal();

  totalExpValue.innerHTML = parseFloat(expTotal).toFixed(2);



  // to calculate the FINAL BALANCE at the top section==========================
  finalBal.innerHTML = (parseFloat(totalIncValue.innerHTML) - parseFloat(totalExpValue.innerHTML)).toFixed(2);

}





// to add the user inputed info to either the Inc Table or Exp Table ===========
submitBtn.addEventListener('click', submitInfo);
function submitInfo(){

  // obtaining the values of the description and amount the user has imputed====
  let userAmntInput = userValue.querySelector('input').value;
  let userdescriptionInput = addDescription.querySelector('input').value;



  // to create new elements for the income and expenses table===================
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
  ulAmntContainer.appendChild(ulAmntValue);
  ulAmntContainer.appendChild(sign);
  ulCalcContainer.appendChild(ulAmntContainer);
  ulCalcContainer.appendChild(ulPercent);
  ulCalcContainer.appendChild(ulDeleteBtn);
  ulList.appendChild(ulListItem);
  ulList.appendChild(ulCalcContainer);





  // this if statement is to avoid any empty or below 1 user input==============
  if ((userAmntInput >= 1) && (userdescriptionInput.length > 0)){


    // this if statement is checking if the user has selected the + or - sign===
    if (signDropdown.value == "plus"){

      // Appending the information the user has inputed to the Income table-----
      ulAmntValue.innerHTML = parseFloat(userAmntInput).toFixed(2);
      ulListItem.innerHTML = userdescriptionInput;
      incomeTable.appendChild(ulList);

      calcAllBudget();

    }else{

      // Appending the information the user has inputed to the Exp table--------
      ulAmntValue.innerHTML = parseFloat(userAmntInput).toFixed(2);
      ulListItem.innerHTML = userdescriptionInput;
      expensesTable.appendChild(ulList);

      calcAllBudget();

    }

  }else{
    alert("PLease insert description and a value not less than 1");
  }

}
