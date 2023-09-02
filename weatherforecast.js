const weatherforecast = {template:`
<div class="container border border-success rounded-pill mt-5">
        <div class="row">
            <label class="col-2 col-form-label border-end border-success fw-bold" for="inputCountry">Country</label>
            <div class="col-2 p-0 border-end border-success">
                <input class="form-control border-top-0 border-start-0 border-bottom-0 rounded-0" type="text" id="inputCountry" value="Malaysia" disabled>
            </div>            
            <label class="col-2 col-form-label border-end border-success fw-bold" for="inputCity">City</label>
            <div class="col-6 p-0">
                <select class="form-select border-0 rounded-start-0 rounded-end-pill" id="inputCity" v-model="CitySelected">
                    <option v-for="city in cities">{{city.City}}, {{city.State}}</option>
                </select>
            </div>
        </div>
    </div>

    <div class="container text-center mt-5">
        <div class="row gx-3">
            <div class="col">
                <div class="border rounded-4 p-2 shadow">
                    <p class="m-0">Today</p>
                    <p class="m-0">09/02/2023</p>
                    <img src="http://openweathermap.org/img/wn/01d@2x.png">
                    <p class="m-0">Rain</p>
                    <p class="m-0">32°C</p>
                </div>                
            </div>
            <div class="col">
                <div class="border rounded-4 p-2 shadow">
                    <p class="m-0">Today</p>
                    <p class="m-0">09/02/2023</p>
                    <img src="http://openweathermap.org/img/wn/01d@2x.png">
                    <p class="m-0">Rain</p>
                    <p class="m-0">32°C</p>
                </div>    
            </div>
            <div class="col">
                <div class="border rounded-4 p-2 shadow">
                    <p class="m-0">Today</p>
                    <p class="m-0">09/02/2023</p>
                    <img src="http://openweathermap.org/img/wn/01d@2x.png">
                    <p class="m-0">Rain</p>
                    <p class="m-0">32°C</p>
                </div>    
            </div>
            <div class="col">
                <div class="border rounded-4 p-2 shadow">
                    <p class="m-0">Today</p>
                    <p class="m-0">09/02/2023</p>
                    <img src="http://openweathermap.org/img/wn/01d@2x.png">
                    <p class="m-0">Rain</p>
                    <p class="m-0">32°C</p>
                </div>   
            </div>
        </div>
    </div>
`,

data(){
    return {
        cities: [],
        CitySelected:""
    }
},
methods:{
    getCities(){
        axios.get(variables.API_URL+"listofcities")
        .then((response)=>{
            this.cities=response.data;
            console.log(this.cities.sort());            
        })
    }
},
mounted:function(){
    this.getCities();
}}