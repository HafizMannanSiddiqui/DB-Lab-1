// include api for currency change
const api = "https://api.exchangerate-api.com/v4/latest/USD";

//jshint esversion:6
const express = require('express');
const https = require("https");
const path = require('path');

const router = express.Router();
const app = express();


app.use(express.static("public"));

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/currency.html'));
  });
  
  //add the router
  app.use('/', router);

//document.querySelectorAll(("h1").css("color","blue"));

const search = $(".searchBox");
const convert = $(".convert");
const fromCurrecy = $(".from");
const toCurrecy = $(".to");
const finalValue = $(".finalValue");
const finalAmount = document.getElementById("finalAmount");
let resultFrom;
let resultTo;
let searchValue;
 
// Event when currency is changed
fromCurrecy.addEventListener('change', (event) => {
    resultFrom = `${event.target.value}`;
});
 
// Event when currency is changed
toCurrecy.addEventListener('change', (event) => {
    resultTo = `${event.target.value}`;
});
 
search.addEventListener('input', updateValue);
 
// function for updating value
function updateValue(e) {
    searchValue = e.target.value;
}
 
// when user clicks, it calls function getresults
convert.addEventListener("click", getResults);
 
// function getresults
function getResults() {
    fetch(`${api}`)
        .then(currency => {
            return currency.json();
        }).then(displayResults);
}
 
// display results after conversion
function displayResults(currency) {
    const fromRate = currency.rates[resultFrom];
    const toRate = currency.rates[resultTo];
    finalValue.innerHTML =
       ((toRate / fromRate) * searchValue).toFixed(2);
    finalAmount.style.display = "block";
}
 
// when user click on reset button
function clearVal() {
    window.location.reload();
    document.getElementsByClassName("finalValue").innerHTML = "";
};



app.listen(3000, function() {
    console.log("Server started on port 3000");
});