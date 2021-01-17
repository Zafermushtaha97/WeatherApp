<template>
    <div>
    <div class="header">
        <div class="search-box">
          <input 
            type="text" 
            class="search-bar" 
            placeholder="Search City"
            v-model="CityName"
            @keyup.enter="getWeather()"
          />
            <div style="margin-top: 5px; text-align: center;">
            <p style="font-size: 0.7em;color:white">Enter the "city, state" e.g. "madison, wisconsin"</p>
            </div>
        </div>
    </div>
    <div v-if="loader" style="display:flex;justify-content: center;">
      <ring-loader loading=true color="#dbebfa"  size="80px"></ring-loader>
    </div>
    <div class="weather" v-if="data">
         <div class="results" >
              <div class="city-result">
                 <div class="location">
                   <div>{{data.name}},{{data.sys.country}}</div>
                    <div><p><span>{{(data.main.temp-273.15).toFixed(3)}}<span>&#8451;</span></span></p></div>
                  </div>
                  <div class="status">
                    <div style="text-align: center;">
                      <img id="icon" :src="`http://openweathermap.org/img/wn/` + data.weather[0].icon + `@2x.png`"/>
                    </div>
                    <span>{{data.weather[0].description}}</span>
                  </div>
              </div>
        </div>
    </div>

    <!-- more details section -->
       <div class="details" v-if="data">
         <div>
           <h2>Weather Today in {{data.name}},{{data.sys.country}}</h2>
           <h2 style="margin: .6em 0;">{{(data.main.temp-273.15).toFixed(3)}}°</h2>
           <span>{{data.weather[0].description}}</span>
         </div>
         <div class="details-title">
            <div class="details-degree">
              <div style="display:flex">
                  <div class="icon"><img src="../assets/degree/thermometer.svg"></div>
                  <span>Max/Min</span>
              </div>
              <div><span><span>{{(data.main.temp_max-273.15).toFixed(3)}}<span>&#8451;</span></span>/{{(data.main.temp_min-273.15).toFixed(3)}}<span>&#8451;</span></span></div>
            </div>
             <div class="details-degree">
              <div style="display:flex">
                  <div class="icon"><img src="../assets/degree/wind.svg"></div>
                  <span>Wind</span>
              </div>
              <div><span>{{data.wind.speed}}</span></div>
            </div>
             <div class="details-degree">
              <div style="display:flex">
                  <div class="icon"><img src="../assets/degree/gauge.svg"></div>
                  <span>Pressure</span>
              </div>
              <div><span>{{data.main.pressure}} mb</span></div>
            </div>
             <div class="details-degree">
              <div style="display:flex">
                  <div class="icon"><img src="../assets/degree/humidity.svg"></div>
                  <span>Humidity</span>
              </div>
              <div><span>{{data.main.humidity}} %</span></div>
            </div>
         </div>
        </div>
         <!-- more details section -->

         <!-- address city  -->
           <div class="map" v-if="data">
            <GmapMap
                :center="{lat:data.coord.lat, lng:data.coord.lon}"
                :zoom="8"
                map-type-id="terrain"
                style="width: 500px; height: 300px"
                >
                 <GmapMarker
                    :position="{lat:data.coord.lat, lng:data.coord.lon}"
                     :icon="{ url: require('../assets/location.svg'),scaledSize: {width:40, height: 40}}"
                />
            </GmapMap>
        </div>
       <!-- address city  -->
    </div>
</template>
<script>
import {gmapApi} from 'vue2-google-maps'
const axios = require('axios');
export default {
  name: 'Weather',
  data(){
    return{
      data:null,
      CityName:null,
      url_base: 'https://api.openweathermap.org/data/2.5/',
      api_key:'d1a8258e94f4a3936e9041d30ed0f299',
      locationFound:null,
      lat:null,
      lng:null,
      loader:true
    }
  },
  components: {
    
  },
  computed: {
    google: gmapApi,
  },
  methods:{
      getWeather(){
           axios.get(`${this.url_base}weather?q=${this.CityName}&appid=${this.api_key}`).then(response =>{
          this.data = response.data
          this.loader = false
         }).catch(error=>{
            console.log(error)
        })
      }
  },
  mounted(){
   if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(position =>{
           this.locationFound =true;
           this.lng = position.coords.longitude;
           this.lat = position.coords.latitude;
           axios.get(`${this.url_base}weather?lat=${this.lat}&lon=${this.lng}&appid=${this.api_key}`).then(res =>{
               this.data = res.data
               this.loader = false
           })

       })
   }
   
  }
}
</script>

<style scoped>
.header{
    width: 450px;
    display: flex;
    margin: 24px auto;
}
.weather{
    /* display: flex;
    justify-content: center;
    align-items: center; */
    padding: 20px 20px 0px;
    flex-direction: column;
    width: 54%;
    margin: 20px auto;
    /* background: rgba(48,62,143); */
    box-shadow: 7px -4px 33px -6px rgb(35 62 54);
    background-image: linear-gradient(to top, #48c6ef 0%, #1654de 100%);
    /* background: hsla(0,0%,100%,.1)!important; */
    border-radius: 8px;
}
.results{
    /* max-width: 70%;
    width: 70%; */
    /* margin: 1.2em 1.2em 2.4em; */
    padding: 1em;
}
.results .city-result{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.search-box {
  width: 100%;
  margin-bottom: 8px;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 44px;
  transition: 0.4s;
}
.search-box .search-bar:focus {
  box-shadow: 0px 0px 016px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
}
.search-box .search-bar::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: white;
  opacity: 1; /* Firefox */
}

.search-box .search-bar:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: white;
}

.search-box .search-bar::-ms-input-placeholder { /* Microsoft Edge */
  color: white;
}
.vue-map-container{
    width: 810px !important;
    height: 400px !important;
    max-width: 100%;
}
.map .vue-map{
  border-radius: 8px;
  left: 20px;
}
.map{
  width: 54%;
  margin: 20px auto;
}
.vue-map-container .vue-map{
  border-radius: 8px;
}
/* .results > div{
  display: flex;
    align-items: center;
    justify-content: center;
} */
.results p{
  color: white;
  font-size: 22px;
  font-weight: 600;
  font-family: sans-serif;
  font-style: oblique;

}
.location{
  color: white;
  text-align: center;
  margin-bottom: 5px;
  font-size: 34px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
.status{
  display: grid;
}
.status span{
    text-align: center;
    color: white;
    font-weight: 800;
    font-size: 24px;
}
.details{
    width: 54%;
    background: white;
    margin: 20px auto;
    padding: 1.4em 2.4em;
    border-radius: 8px;
}
.details div h2{
     font-family: sans-serif;
}
.details span{
  font-size: 18px;
  font-family: 'Roboto';
}
.details-title{
  display: flex;
  flex-wrap: wrap;
  margin-top: 2em;
} 
.details-degree{
  margin-left: 6px;
  flex-basis: 49%;
  -webkit-box-flex: 1;  
  flex-grow: 1;
  -ms-flex-negative: 1;
  flex-shrink: 1;    
  padding: 10px 16px;
  border-top: 1px solid #dedede!important;
  display: flex;
  justify-content: space-between;
}
.details-degree .icon{
  width: 20px;
  height: 20px;
  margin-right: 4px;
}
</style>