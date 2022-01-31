const button = document.getElementById("submit")
const input = document.getElementById("cityInput");

import api from "./config.js";


button.addEventListener('click', function(name){
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+input.value+'&appid='+ api.key)
    .then(response => response.json())
    .then(data => console.log(data))
    
    .catch(err => alert("Wrong city name!"));
})