const input = document.querySelector(".search-input");
const searchBtn = document.getElementById("searchBtn");
const themeBtn = document.querySelector(".themeBtn");
const weatherCard = document.querySelector(".weatherCard");
const favoriteBtn = document.getElementById("favoriteBtn");
const favoritesList = document.getElementById("favoritesList");
const favoriteCard = document.querySelector(".favoriteCard");
const addingCard = document.querySelector(".addingCard");



themeBtn.addEventListener("click",() => {
    
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");

if(document.body.classList.contains("dark")){
    themeBtn.innerText="Dark";
    themeBtn.style.backgroundColor = "#2f172f";
    themeBtn.style.color = "aliceblue";
}else{
    themeBtn.innerText="Light";
    themeBtn.style.backgroundColor = "rgb(20, 38, 55)";
    themeBtn.style.color = "rgb(70, 139, 200)";
}
    weatherCard.classList.toggle("dark");
    weatherCard.classList.toggle("light");

    favoriteCard.classList.toggle("dark");
    favoriteCard.classList.toggle("light");

    addingCard.classList.toggle("dark");
    addingCard.classList.toggle("light");


});



// input.addEventListener("input",()=>{
//     console.log("User is typing...");
//     checkWeather(input);
// })

searchBtn.addEventListener("click", () => {
    checkWeather(input.value)
})


const apiKey ="6e7e6325fd5092ae68f1e068addbdff0"

async function checkWeather(city) {
    const loader = document.getElementById("loader");
     loader.style.display = "block";

    const errorMsg = document.getElementById("errorMsg");

    try{

        if(!city || city.trim() === ""){
            throw new Error("Please enter a city name");
        }

        errorMsg.style.display="none";
        errorMsg.textContent="";

    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6e7e6325fd5092ae68f1e068addbdff0&units=metric`;

    const response = await fetch(apiUrl)

    const data =await response.json(); 

     if(!response.ok){
        throw new Error(data.message || "Invalid city name");
    }

    console.log(data);

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temp").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;

    const weatherIcon =document.getElementById("weatherIcon");
    
    if(data.weather[0].main === "Rain"){
        weatherIcon.src="images/rain.png"
    }else if(data.weather[0].main === "Clear"){
        weatherIcon.src ="images/clear.png"
    }else if(data.weather[0].main === "Mist"){
        weatherIcon.src ="images/mist.png"
    }else if(data.weather[0].main === "Drizzle"){
        weatherIcon.src ="images/drizzle.png"
    }else if(data.weather[0].main === "Clouds"){
        weatherIcon.src ="images/clouds.png"
    }else if(data.weather[0].main === "Snow"){
        weatherIcon.src ="images/snow.png"
    }else{
        weatherIcon.src="default.png"
    }
   }catch(error){
    errorMsg.style.display="block";
    errorMsg.textContent = error.message;
   }finally {
    loader.style.display = "none";
}
}
async function addFavorite(city) {
    
 let favorites = localStorage.getItem("favorites");

if(favorites){
   favorites = JSON.parse(favorites); 
}else{
   favorites = [];
}

if(!favorites.includes(city)){
    favorites.push(city);

    localStorage.setItem("favorites",
      JSON.stringify(favorites)
    );

    console.log(`${city} Added to favorite`)
}else{
    console.log("Already in favorite");
}

loadFavorites();
}

favoriteBtn.addEventListener("click",()=>{
    const city = document.getElementById("cityName").textContent;
    addFavorite(city);
    });

    function loadFavorites(){
        let data =localStorage.getItem("favorites"); 
        if(!data){
            return;
        }
        let favorites = JSON.parse(data);

        addingCard.innerHTML = ""; 

        for(let city of favorites){
        let container = document.createElement("div");
        container.classList.add("favoriteItem");

        let p = document.createElement("p");
            p.textContent = city ;
    
        let btn = document.createElement("button");
            btn.id="removeBtn"
            btn.textContent="X";
            // btn.style.backgroundColor="rgb(20, 38, 55)"


            btn.addEventListener("click", ()=>{
                removeFavorite(city);
            });

            p.addEventListener("click", ()=>{
                input.value = city;
                checkWeather(city)
            });

            container.appendChild(p);
            container.appendChild(btn);

            addingCard.appendChild(container);

        }
    }
    loadFavorites();

function removeFavorite(city){

    let data =localStorage.getItem("favorites");
    let favorites;
    if(data){
     favorites = JSON.parse(data); 
     }else{
      favorites = [];
    }
    let newFavorites = favorites.filter((item)=>{
        return item !== city ;
    });
    localStorage.setItem("favorites", JSON.stringify(newFavorites));

    favoritesList.innerHTML="";
    loadFavorites();

}
let time;
input.addEventListener("input",(searched)=>{
    clearTimeout(time)
    time = setTimeout(()=>{
         if (input.value.trim() !== "") {
            checkWeather(input.value)
        }
    },500)
}) 
    

    