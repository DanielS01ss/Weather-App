let city = "Bucharest";
const submitBtn = document.querySelector(".submit-data");
const mainInput = document.querySelector("input");
const errorMsgContainer = document.querySelector("label");
/*

    Codurile ne dau tipul de vreme
     -> pana acuma am luat imagini pentru astea:

        1.thunder
        2.drizzle(burnita) si rain
        3.snow 
        4.tot ce tine de atmosfera
        5.sun -> asta defapt e clear
        6.clouds 

*/

function errorRemove(){
    errorMsgContainer.classList.add("hidden");
    errorMsgContainer.removeAttribute("id");
}
mainInput.addEventListener('click',errorRemove);
submitBtn.addEventListener('click',clickHandler);


function clickHandler(evt)
{
    console.log(errorMsgContainer);
    errorMsgContainer.classList.add("hidden");
    errorMsgContainer.removeAttribute("id");
    evt.preventDefault();
    ///vedem daca este continut in input

    let capitalizeFirstLetter = (s)=>{
        return s.charAt(0).toUpperCase()+s.slice(1);
    }

    if(mainInput.value.length!==0)
    {
    city = capitalizeFirstLetter(mainInput.value);
    console.log(city);
    const api_key = "1b16f8b47795b7fe23169fe190d4f865";
    const url_req = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;   

    fetch(url_req)
    .then(function(response){
      return response.json();
    })
    .then(handleData);

    }
    else{
        errorMsgContainer.classList.remove("hidden");
        errorMsgContainer.setAttribute("id","msg-err");
        errorMsgContainer.textContent = "You have to enter a city";
    }


}


function handleData(data){
       /*
        What we need so far 
            ->from the user we will get the city
            -> we need to check to see if the request worked first


        FROM THE API:
            ->if we got the response back from api what we will get it's
                ->country name
                ->temperature (we'll use Math.trunc()) to round the temperature
                ->We need the code to set up the icon
                -> We also need the weather status : thunder to display it on page

    */
    console.log(data);
    if(data.message)
    {
        ///here we need to add a message under the input to announce the user
        ///that his/her city was not found
        errorMsgContainer.classList.remove("hidden");
        errorMsgContainer.setAttribute("id","msg-err");
        errorMsgContainer.textContent = "Are you sure that is the correct city name?";
    }
 
    else{
        const weatherCardsContainer = document.querySelector(".weather-cards");
        const countryName = data.sys.country;
        const temperature = Math.trunc(data.main.temp);
        const codeForIcon = data.weather[0].id;
        const weatherStatus = data.weather[0].description;
        console.log(weatherCardsContainer,countryName,temperature,codeForIcon,weatherStatus);

        ///creem un card
        ///si toate elementele de care are el nevoie
        const card = document.createElement("div");
        const title = document.createElement("h1");
        const cityCountry = document.createElement("span");
        const tempDigit = document.createElement("p");
        const tempSymbol = document.createElement("span");
        const weatherData = document.createElement("div");
        const weatherIcon = document.createElement("img");
        const weatherDesc = document.createElement("p");

        
        
        card.classList.add("card");

        ///aici avem numele orasului si tara
        title.classList.add("city-name");
        title.textContent = city;
        cityCountry.classList.add("country-name");
        cityCountry.textContent = countryName;
        title.appendChild(cityCountry);

        ///aici avem temperatura
        tempDigit.classList.add("temp-digit");
        tempDigit.textContent = temperature;
        tempSymbol.textContent = "℃";
        tempSymbol.classList.add("temp-symbol");
        tempDigit.appendChild(tempSymbol);


        ///aici avem datele legate de starea temperaturii
        /// si descrierea vremii
        weatherData.classList.add("weather-data");
        weatherDesc.classList.add("weather-description");
        weatherDesc.textContent = weatherStatus;
        ///avem if-uri pe baza carora decidem ce icon punem
        weatherIcon.classList.add("weather-img");
        if(codeForIcon>=200 && codeForIcon<=232)
        {
            //aici avem thunder
            weatherIcon.setAttribute("src","Weather-Images/thunder.svg");
            weatherIcon.setAttribute("alt","thunderbolt");
        }
        else if(codeForIcon>=300 && codeForIcon<=321)
        {
            //aici avem rain
            weatherIcon.setAttribute("src","Weather-Images/rain.svg");
            weatherIcon.setAttribute("alt","rain-logo");


        }
        else if(codeForIcon>=500 && codeForIcon<=531)
        {
            ///snow
            weatherIcon.setAttribute("src","Weather-Images/snow.svg");
            weatherIcon.setAttribute("alt","snow icon");

        }
        else if(codeForIcon>=701 && codeForIcon<=781)
        {
            ///tot ce tine de fog,mist
            weatherIcon.setAttribute("src","Weather-Images/fog.svg");
            weatherIcon.setAttribute("alt","fog and others icon");

        }
        else if(codeForIcon===800)
        {
            ///aici este clear sky
            weatherIcon.setAttribute("src","Weather-Images/sun.svg");
            weatherIcon.setAttribute("alt","sun icon");
        }
        else if(codeForIcon>=801 && codeForIcon<=804)
        {
            ///aici este pentru clouds
            weatherIcon.setAttribute("src","Weather-Images/clouds.svg");
            weatherIcon.setAttribute("alt","cloud icon");
        }
        
        ///aici adaugam iconul si datele despre vreme
        ///daca e thunder sau ce este
        weatherData.appendChild(weatherIcon);
        weatherData.appendChild(weatherDesc);

        card.appendChild(title);
        card.appendChild(tempDigit);
        card.appendChild(weatherData);
        weatherCardsContainer.appendChild(card);
    }
    

}