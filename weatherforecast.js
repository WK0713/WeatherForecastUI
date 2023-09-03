const weatherforecast = {template:`
<div class="container border border-secondary rounded-pill mt-5">
        <div class="row">
            <label class="col-2 col-form-label border-end border-secondary fw-bold" for="inputCountry">Country</label>
            <div class="col-2 p-0 border-end border-secondary">
                <input class="form-control border-top-0 border-start-0 border-bottom-0 rounded-0" type="text" id="inputCountry" value="Malaysia" disabled>
            </div>            
            <label class="col-2 col-form-label border-end border-secondary fw-bold" for="inputCity">City</label>
            <div class="col-6 p-0">
                <select class="form-select border-0 rounded-start-0 rounded-end-pill" id="inputCity" v-model="CitySelected" v-on:change="getDailyForecast()">
                    <option v-for="city in cities">{{city.City}}, {{city.State}}</option>
                </select>
            </div>
        </div>
    </div>

    <div class="container text-center mt-5">
        <div class="row gx-3">
            <div class="col" v-for="daily in dailyForecastData">
                <div class="border rounded-4 p-2 shadow bg-secondary-subtle fw-bold">
                    <p class="m-0">{{getDay(daily.dt)}}</p>
                    <p class="m-0">{{getDate(daily.dt)}}</p>
                    <img :src="iconPath+daily.weather[0].icon+iconType">
                    <p class="m-0">{{daily.weather[0].main}}</p>
                    <p class="m-0">{{daily.temp.day}}°C</p>
                </div>
            </div>
        </div>
    </div>
`,

data(){
    return {
        cities: [],
        CitySelected:"",
        dailyForecastData:[],
        iconPath:variables.ICON_URL,
        iconType:".png"
    }
},
methods:{
    getCities(){
        axios.get(variables.API_URL+"listofcities")
        .then((response)=>{
            this.cities=response.data;
        })
    },
    getDailyForecast(){
        
        //find the coordinate of the city selected
        let citySelectedArr = this.CitySelected.split(", ", 2);
        let city = this.cities.find((loc) => loc.City === citySelectedArr[0] && loc.State === citySelectedArr[1]);

        axios.get(variables.API_URL+"dailyforecast?lat="+city.Latitude+"&lon="+city.Longitude)
        .then((response)=>{
            this.dailyForecastData=response.data;
            console.log(this.dailyForecastData);
        })
    },
    getDay(utcTimestamp){
        const unixDate = utcTimestamp; // Replace with your Unix timestamp
        const dateTimeStamp = new Date(unixDate * 1000);

        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        return weekday[dateTimeStamp.getDay()];
    },
    getDate(utcTimestamp){
        const unixDate = utcTimestamp; // Replace with your Unix timestamp
        const dateTimeStamp = new Date(unixDate * 1000); // Convert Unix timestamp to milliseconds
        
        let year = dateTimeStamp.getFullYear();
        let month = (1 + dateTimeStamp.getMonth()).toString().padStart(2, '0');
        let day = dateTimeStamp.getDate().toString().padStart(2, '0');

        return `${month}/${day}/${year}`;
    }
},
mounted:function(){
    this.getCities();
}}