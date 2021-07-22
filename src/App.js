import './App.css';
import React, { useEffect, useState } from "react";
import Weather from './components/Weather';
import { Dimmer, Loader } from 'semantic-ui-react';

export default function App() {

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        console.log("lat" + lat);
        console.log("long" + long);
      });

      // eslint-disable-next-line no-undef
      await fetch(`${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setData(result)
          console.log(result);
        });
    }
    fetchData();
  }, [lat, long])

  return (
    <div className="App">
      <div className="App-header">
        <div className="Title">Weather App</div>
        
        {(typeof data.main != 'undefined') ? (
          <div>
          <Weather weatherData={data} />
          </div>
        ) : (
          <div>
            <Dimmer active>
              <Loader>Loading...</Loader>
            </Dimmer>
          </div>
        )}
        <div className="Author">Created by Wilson Veterano</div>
      </div>
    </div>
  );
}

