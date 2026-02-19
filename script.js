const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", async(evt)=>{
    const city = cityInput.value.trim();

    if(city === ""){
        alert("Please Enter a City");
        return;
    }

    try{
        // 1️⃣ Get latitude & longitude
        const geoURl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
        const geoResponse = await fetch(geoURl);
        const geoData = await geoResponse.json(); 
        console.log(geoData);      // we will get result keys here.

        if(!geoData.results){    //👉 No. results is NOT a variable you created. It is a property (key) of the object returned by the API. it will seen in the console.
            document.getElementById("errorMsg").innerText = "City not found !!!";
            return;
        }

        // const { latitude, longitude, name, country } = geoData.results[0];  //thia is the short form of the below code.
        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;
        const name = geoData.results[0].name;
        const country = geoData.results[0].country;


        // 2️⃣ Get weather data
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        // get temp & wind from weatherData
        const temp = weatherData.current_weather.temperature;  // weatherData -> current_weather -> temperature
        const wind = weatherData.current_weather.windspeed;    // weatherData -> current_weather -> windspeed
        console.log("Weather data is here :",weatherData);   // from here you will get the answer off upper 2 variables(weatherResponse,weatherData).

        // 3️⃣ Display data
        document.getElementById("errorMsg").innerText = "";
        document.getElementById("cityName").innerText = `${name}, ${country}`;
        document.getElementById("temperature").innerText = `temp : ${temp}`;
        document.getElementById("description").innerText = "Current Weather";
        document.getElementById("humidity").innerText = "";
        document.getElementById("wind").innerText = `Wind : ${wind}`;

        
    }catch(error){
        document.getElementById("errorMsg").innerText = "Something went wrong!!!!!!!!";
    }

});