let city = "Memphis";
const api_key = "1b16f8b47795b7fe23169fe190d4f865"
const url_req = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

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

fetch(url_req)
.then(function(response){
    return response.json();
})
.then(handleData);

function handleData(data){
    console.log(data);
    const weatherCardsContainer = document.querySelector("")

}