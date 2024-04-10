const weatherForm = document.querySelector(".weatherForm")
const cityInput = document.querySelector(".cityInput")
const card = document.querySelector(".card")
const apiKey = "088b8ba56047a3e52cf75e51a82af367";


weatherForm.addEventListener("submit", async event =>{
            event.preventDefault();

            const city = cityInput.value;

            if(city){
                try{
                    const weatherData = await getWeatherData();
                    displayWeatherInfo(weatherData)
                


                }
                catch(error){
                    console.error(error)
                    display(error)
                }
            }

            else{
                displayError("Please enter a city")
            }
})

async function getWeatherData(city){
    city = cityInput.value;

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`


        city = cityInput.value;
        const response = await fetch(apiUrl)
        console.log(response)

        if(!response.ok){
            throw new Error ("Could not fetch Weather Data")
        }

        return await response.json()
        
}

function displayWeatherInfo(data){
    const {name: city, 
         main: {temp, humidity}, 
         weather: [{description, id}]} = data;

         card.textContent = "";
         card.style.display = "flex";

         const cityDisplay = document.createElement("h1")
         cityDisplay.textContent = city;
         cityDisplay.classList.add("cityDisplay")


            const tempDisplay = document.createElement("p") 
            tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
            tempDisplay.classList.add("tempDisplay")

            const humidityDisplay = document.createElement("p");
            humidityDisplay.textContent = `Humidity: ${humidity}%`;
            humidityDisplay.classList.add("humidityDisplay")

            const descDisplay = document.createElement("p")
            descDisplay.textContent = description;
            descDisplay.classList.add("descDisplay")

            const weatherEmoji = document.createElement("p")
            weatherEmoji.textContent = getWeatherEmoji(id)
            weatherEmoji.classList.add("weatherEmoji")
    


         card.appendChild(cityDisplay);
         card.appendChild(tempDisplay)
         card.appendChild(humidityDisplay)
         card.appendChild(descDisplay)
         card.appendChild(weatherEmoji)


}

function getWeatherEmoji(weatherId){
            switch(true){
            case (weatherId >=  200 && weatherId < 300): 
                        return "⛈️";

           case (weatherId >=  300 && weatherId < 400): 
          return "🌧️";

          case (weatherId >= 500 && weatherId < 600): 
          return "☔";

          case (weatherId >= 600  && weatherId < 700): 
          return "❄️";

          case (weatherId >= 700 && weatherId < 800): 
          return "🌫️";

          case (weatherId === 800): 
          return "☀️";

          case (weatherId >=  801 && weatherId < 810): 
          return "☁️";

          default:
            return "❓"

        }
}

function displayError(message){
        const errorDisplay = document.createElement("p")
        errorDisplay.textContent = message;
        errorDisplay.classList.add("errorDisplay")

        card.textContent = ""
        card.style.display = "flex"

        card.appendChild(errorDisplay)

}