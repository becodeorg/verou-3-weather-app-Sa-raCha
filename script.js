import  Data  from "./config.js";
const submitButton = document.getElementById("submit")
const submitInput = document.getElementById("cityInput");
const container = document.getElementById("container");

const getLatLong = () => {
    let userInput = submitInput.value
    container.innerHTML="";
    
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + userInput + '&appid=' + Data.key)
    .then(response => response.json())
    .then(data => {

        let nameValue = data['city']['name']
        const span = document.getElementById("currentCity")
        span.innerHTML = nameValue;
            
        let lat = data["city"]["coord"].lat;
        let lon = data["city"]["coord"].lon;

    getData(lat, lon)
        

    })
    .catch(err => alert("Sorry can't seem to find that city, would you like to try again?")) 
}

const getData = (lat, lon) =>{
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=metric&appid=" + Data.key )
        .then(response => response.json())
        .then(data => { 
            let weatherData = data.daily;
            console.log(weatherData);
            for (let i = 0; i < 5; i++) {
                addCard(weatherData, i)
                
            }    
        })
    
}

submitButton.addEventListener("click", getLatLong);

submitInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
     getLatLong()
     }

});


function getNameDay(weekDays) {
    const names = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    return names[weekDays.getDay()]
}
function getNameMonth(date) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[date.getMonth()]
}

//function data 

function addCard(weatherData,i){
    
    const unixtime = weatherData[i].dt;
    const daydate = new Date(unixtime * 1000);
    const iconid = weatherData[i].weather[0].icon;
    const iconurl = "http://openweathermap.org/img/wn/" + iconid + "@2x.png";
    const temp = Math.round(weatherData[i].temp.day) + "??C";
    const des = weatherData[i].weather[0].description;

    const section = document.createElement('section');
    section.classList = "card";


    const header = document.createElement('div');
    header.classList = "card-header";

    const dayName = document.createElement("h2")
    const date = document.createElement("h3");

    const dayInMonth = document.createElement("span")
    const month = document.createElement("span")



    dayName.innerText = getNameDay(daydate);
    dayInMonth.innerText = daydate.getDate() ;
    month.innerText = getNameMonth(daydate);


    const img = document.createElement("img");
    img.setAttribute("src", iconurl);

    const desEl = document.createElement("p");
    desEl.innerHTML = des;
 
    const tempP = document.createElement("p");
    tempP.className = "temp";
    tempP.innerText = temp


    container.appendChild(section);
    section.append(header, img, desEl, tempP);
    header.append(dayName, date);
    date.append(dayInMonth, month)

    
}


