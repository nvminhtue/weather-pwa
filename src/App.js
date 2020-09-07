import React, { useState, useCallback } from 'react';
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import { fetchWeather } from './api/fetchWeather';

const App = () => {
  const [value, setValue] = useState('')
  const [weather, setData] = useState({})

  const handleSearch = useCallback(async (e) => {
    if (e.key === 'Enter' && value) {
      const data = await fetchWeather(value.toLowerCase());
      setData(data);
      setValue('');
    }
  }, [value])

  return (
    <div className="main-container">
      <input
        type="text"
        name="city"
        className="search"
        placeholder="Search..."
        value={value}
        onChange={e => setValue(e.target.value && e.target.value)}
        onKeyPress={handleSearch}
      />
      {!isEmpty(weather) && weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{get(weather, 'name', '')}</span>
            <sup>{get(weather, 'sys.country', '')}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(get(weather, 'main.temp', ''))}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img className="city-icon" src={`https://openweathermap.org/img/wn/${get(weather, 'weather[0].icon', '')}@2x.png`} alt={get(weather, 'weather[0].description', '')} />
            <p>{get(weather, 'weather[0].description', '')}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App;
