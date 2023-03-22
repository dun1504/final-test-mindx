import React from 'react';
import { useState, } from 'react';
import {CiTempHigh} from 'react-icons/ci';
import { FiWind } from "react-icons/fi";
import {RiCelsiusFill } from 'react-icons/ri';
import './App.css';

const List_Icon = [
  {
    type: "Clear",
    img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
  },
  {
    type: "Rain",
    img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
  },
  {
    type: "Snow",
    img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
  },
  {
    type: "Clouds",
    img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
  },
  {
    type: "Haze",
    img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
  },
  {
    type: "Smoke",
    img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
  },
  {
    type: "Mist",
    img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
  },
  {
    type: "Drizzle",
    img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
  },
];
function App() {

  const [input, setInput] = useState('');
  const [weather,setWeather] =useState([
  ]); //update = city

  const getResponse = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=53d2b9e5ffc4c41135c1487777c28306`
    );
    const data = await response.json();
    
    setWeather(data);
    
  }
  const handleSubmit = (event) => {
      setInput(event.target.value);
      
  }

  return (
    <div className="App">
      <div className='weather-app'>
      <div className='header-app'>
        <input type="text" placeholder='City?' onChange={(el) => setInput(el.target.value.toUpperCase())}  />
        <button className='button-getWeather' onClick={getResponse}>Get Weather</button>
      </div>

      <div className='main-app'>
        {console.log(weather.cod)}
        
        

        {weather.cod  == 404   && (
          <div className='weather-detail-none'>
              <h1>Not Found City!!</h1>
              <h1>Please try again !!</h1>
            </div>
            
             
        )
}
        {weather.cod != undefined && 
          (
          <div className='weather-detail'>
            <div className='weather-detail-name'> {weather.name}</div>
            <div className='weather-details-icon'>
              {List_Icon.filter((el) => el.type === weather.weather[0].main).map((el,id) => 
              (
                <div key={id} className='weather-detail-img_container'>
                  <img className='weather-detail-img' src={el.img} alt={el.type}/>
                  <div className='weather-detail-script'>
                    <div>{el.type}</div>
                  </div>
                </div>
                 )
                 )}
               </div>
             <div className='weather-detail-script'>Speed Wind : {weather.wind.speed} km/h <FiWind className='icon-weather'/></div>
             <div className='weather-detail-script'><CiTempHigh className='icon-weather'/>{weather.main.temp} <RiCelsiusFill className='icon-weather'/></div>
           </div>
        )}
        
      </div>
      <div className='footer-app'></div>
      </div>
    </div>
  );
}

export default App;
