const weatherForm = document.querySelector(".weatherForm"); // store the weather form form element and store it in the variable weatherForm 
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

//Add apikey

weatherForm.addEventListener("submit", async event => {

    event.preventDefault(); // prevent the page from refreshing

    const city = cityInput.value; // the city that has been inputted by the user

    if(city) 
        // checks if there is a value inputted
    {
        try{
            const weatherData = await getWeatherData(city); // awaits the result from the getWeatherData async function which is the json data
            displayWeatherInfo(weatherData); // executes the displayWeatherInfo function with the json city data obtain from the api 
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else
    // if there is no value inputted
    {
        displayError("Please enter a city"); //invokes displayError function 
    }
});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; 
    // puts in in query the city and the app id as the api key 

    const response = await fetch(apiUrl); // gets the response object from the api 

    console.log(response); 

   

    if(!response.ok){
        throw new Error("Could not fetch weather data"); 
    }

    return await response.json(); // returns the json data
}

function displayWeatherInfo(data){

    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data; // object destructuring 
                                                 // id is for the weather code
    
    card.textContent = "";
    card.style.display = "flex"; // as it style to none 
    
    // Creating the different headings and paragraph within the card 
    const cityDisplay = document.createElement("h1"); // creates a h1 
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    
    // Populating the text content 
    cityDisplay.textContent = city; // populates h1 with the name of the city 
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`; // to fixed to one decimal place 
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id); // get the text content from the getWeatherEmoji function 
    
    // Adding the css styling to the card 
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    //Appending these created elements with the city info to the html page 
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}
    
function getWeatherEmoji(weatherId){
// different weather codes in openweather site
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId === 800):
            return "☀";
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        default:
            return "❓";
    }
}



function displayError(message){

    // Creates and p tag with the error message 
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = ""; // ensure that the card is empty first 
    card.style.display = "flex"; // as it style to none 
    card.append(errorDisplay); // append card with the error message 
}
