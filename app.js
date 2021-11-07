//retrieving the id of results
var monthlyPayment = document.getElementById('monthly-payment');
var totalPayment = document.getElementById('total-payment');
var totalInterest = document.getElementById('total-interest');

loadEventListeners();

function loadEventListeners(){
    // EventListener for submit - calculate
    document.getElementById('loan-form').addEventListener('submit', function(e){
    
    //Hide results
    document.getElementById('results').style.display = 'none';

    //show spinner
    document.getElementById('loading').style.display = 'block';
    
    setTimeout(calculateResults, 2000);


    e.preventDefault();
});

 //EvenListener for submit - Clear Results
 document.querySelector('#clear-results').addEventListener('click', clearResults);
}


//calculate  Results
function calculateResults()
{
    console.log("Calculating...");
    console.log(document.getElementById('clear-results'));
    //retrieving the id of input values
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');

    const principal = parseFloat(amount.value);
    const monthlyInterest = parseFloat(interest.value)/1200;
    const numberOfPayments = parseFloat(years.value) * 12;

    //compute monthlypayment
    const x = Math.pow(1+monthlyInterest,numberOfPayments);
    const fixedMonthlyPayment = (principal * monthlyInterest * x)/(x-1);

    //check if the result is a finite number
    if(isFinite(fixedMonthlyPayment))
    {
        monthlyPayment.value = fixedMonthlyPayment.toFixed(2);  //rounds to 2 decimal places
        totalPayment.value = (fixedMonthlyPayment * numberOfPayments).toFixed(2);
        totalInterest.value = ((fixedMonthlyPayment * numberOfPayments)-principal).toFixed(2);
    
        //show results
        document.getElementById('results').style.display = 'block';

        // hide loader
        document.getElementById('loading').style.display = 'none';

    }else{
        // hide loader
        document.getElementById('loading').style.display = 'none';

        showError('Please check your values.');
    }
}

function showError(errorMessage)
{
    //create a div element
    const error = document.createElement('div');

    //get elements
    const cardBox = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class
    error.className = 'alert alert-danger';

    //create a text node and append to div
    error.appendChild(document.createTextNode(errorMessage));

    //Insert the new div element before heading inside the card box
    cardBox.insertBefore(error, heading);

    //set timer for the alert
    setTimeout(removeElement, 3000);        //invokes the removeElement function after 3000 milliseconds
    
    console.log(error);
}

function removeElement()
{
    document.querySelector('.alert-danger').remove();
}

function clearResults()
{
    monthlyPayment.value = 0.00;
    totalPayment.value = 0.00;
    totalInterest.value = 0.00;   

    //show results
    document.getElementById('results').style.display = 'none';
    
    // hide loader
    document.getElementById('loading').style.display = 'none';

    amount.value = 0;
    interest.value = 0;
    years.value = 0;
}