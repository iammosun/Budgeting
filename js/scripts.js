
// constants--------------------------------------------------------------------
const finalBal = document.querySelector('.final-balance');
const totalIncValue = document.querySelector('.total-inc-value');
const totalExpValue = document.querySelector('.total-exp-value');
const totalPercentValue = document.querySelector('.total-percent');
const signDropdown = document.getElementById('sign-dropdown');
const addDescription = document.forms['add-description'];
const userValue = document.forms['value'];
const submitBtn = document.querySelector('.submit-btn');
const incomeTable = document.querySelector('.income-ul');
const expensesTable = document.querySelector('.expenses-ul');




/*This is to prevent the default refreshing of the page when keyboard Enter is
clicked to submit user input------------------------------------------------------*/
addDescription.addEventListener('submit', function(e){
  e.preventDefault();
});
userValue.addEventListener('submit', function(e){
  e.preventDefault();
});



let totalIncome = 0;
let totalExpenses = 0;



/*Here is the main function that is executed when the submit btn is clicked
------------------------------------------------------------------------------*/
submitBtn.addEventListener('click', clickSubmit);
function clickSubmit(){


  /*these are the newly created elements for the income and expenses table
  ul.--------------------------------------------------------------*/
  const ulList = document.createElement('li');
  const ulListItem = document.createElement('span');
  const ulCalcContainer = document.createElement('span');
  const ulAmntContainer = document.createElement('span');
  const ulDeleteBtn = document.createElement('img');
  const sign = document.createElement('span');
  const ulAmntValue = document.createElement('span');
  const ulPercent = document.createElement('span');




  // to add classes to the newly created elements-----------------------------
  ulList.classList.add('details-container');
  ulListItem.classList.add('list-item');
  ulCalcContainer.classList.add('calc-container');
  ulAmntContainer.classList.add('ul-amnt-container');
  sign.classList.add('sign');
  ulAmntValue.classList.add('ul-amnt-value');
  ulPercent.classList.add('percent-calc');
  ulDeleteBtn.classList.add('delete-btn');
  ulDeleteBtn.setAttribute('src', 'images/bin.png');



  // to append the new elements to the document-------------------------------
  ulAmntContainer.appendChild(ulAmntValue);
  ulAmntContainer.appendChild(sign);
  ulCalcContainer.appendChild(ulAmntContainer);
  ulCalcContainer.appendChild(ulPercent);
  ulCalcContainer.appendChild(ulDeleteBtn);
  ulList.appendChild(ulListItem);
  ulList.appendChild(ulCalcContainer);



  // obtaining the values of the description and amount the user has imputed----
  let userValueInput = userValue.querySelector('input').value;
  let userdescriptionInput = addDescription.querySelector('input').value;



  // this if statement is to avoid any empty or below 1 user input--------------
  if ((userValueInput >= 1) && (userdescriptionInput.length > 0)){


    /*checking for the user input of + or - sign and put the inputed details
    into the right table, that is, income or expenses
    --------------------------------------------------------------------------*/
    if (signDropdown.value == "plus"){

      // Appending the information the user has inputed to the Income table-----
      ulAmntValue.innerHTML = parseFloat(userValueInput).toFixed(2);
      ulListItem.innerHTML = userdescriptionInput;
      incomeTable.appendChild(ulList);


      //updating the total income value at the top section----------------------
      totalIncome = parseFloat(totalIncome) + parseFloat(userValueInput);
      totalIncValue.innerHTML = parseFloat(totalIncome).toFixed(2);


    }else{

      // Appending the information the user has inputed to the Exp table--------
      ulAmntValue.innerHTML = parseFloat(userValueInput).toFixed(2);
      ulListItem.innerHTML = userdescriptionInput;
      expensesTable.appendChild(ulList);



      //updating the total expenses value at the top section--------------------
      totalExpenses = parseFloat(totalExpenses) + parseFloat(userValueInput);
      totalExpValue.innerHTML = parseFloat(totalExpenses).toFixed(2);



      // calculating the individual percentage in the Exp table-----------------
      let percentValue = (parseFloat(userValueInput) * parseFloat(totalIncome)) / 100;
      ulPercent.innerHTML = parseInt(percentValue) + "%";


      // calculating the total percentage at the top Exp section----------------
      const allPercents = document.querySelectorAll('.expenses-ul .percent-calc');
      let totalPercent = 0;

      function percentsCalc(){
        allPercents.forEach(function(percent){
          totalPercent = parseFloat(totalPercent) + parseFloat(percent.innerHTML);
        });
        return totalPercent;
      }
      percentsCalc();

      totalPercentValue.innerHTML = parseInt(totalPercent) + '%';

    }



// =====================================================================delete





    //updating the final balance------------------------------------------------
    finalBal.innerHTML = (parseFloat(totalIncValue.innerHTML) - parseFloat(totalExpValue.innerHTML)).toFixed(2);

  }else{
    alert("Insert a description and a value not less than 1");
  }



  ulDeleteBtn.addEventListener('click', function(e){
    // e.target.closest('li').remove();

    if(e.target.closest('ul').className == 'expenses-ul'){
      e.target.closest('li').remove();
      const allPercents = document.querySelectorAll('.expenses-ul .percent-calc');
      let totalPercent = 0;
      let totalExpenses = 0;

      function percentsCalc(){
        allPercents.forEach(function(percent){
          let expAmntValue = (percent.closest('span')).innerHTML;
          totalExpenses = parseFloat(totalExpenses) + parseFloat(expAmntValue);
          percent.innerHTML = (parseFloat(expAmntValue) * parseFloat(totalIncome)) / 100;
          totalPercent = parseFloat(totalPercent) + parseFloat(percent.innerHTML);
        });
        return totalPercent;
      }
      percentsCalc();


      totalExpValue.innerHTML = parseFloat(totalExpenses).toFixed(2);
      totalPercentValue.innerHTML = parseInt(totalPercent) + '%';

    }else{
      e.target.closest('li').remove();
      const allIncAmnt = document.querySelectorAll('.income-ul .ul-amnt-value');
      let totalIncome = 0;

      function totalIncCalc(){
        allIncAmnt.forEach(function(incomeVal){
          totalIncome = parseFloat(totalIncome) + parseFloat(incomeVal);
        });
        return totalIncome;
      }
      totalIncCalc();

      totalIncValue.innerHTML = parseFloat(totalIncome).toFixed(2);
    }

    finalBal.innerHTML = (parseFloat(totalIncValue.innerHTML) - parseFloat(totalExpValue.innerHTML)).toFixed(2);
  });







}
