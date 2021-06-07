import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountrySolo = ({countrySolo}) => {
  // Commented out due to the api monthly limit usage
  // const [weather, setWeather] = useState([])
  // let REACT_APP_API_KEY = ...
  // let api_link = `http://api.weatherstack.com/current?access_key=${REACT_APP_API_KEY}&query=${countrySolo.capital}`
  // const hook2 = () => {
  //   axios
  //     .get(api_link)
  //     .then(response => {
  //       setWeather(response.data)
  //     })
  // }
  // useEffect(hook2, [api_link])

  return (
    <>
      <h1> {countrySolo.name}</h1>
      <p> Capital: {countrySolo.capital}</p>
      <p> Population: {countrySolo.population}</p>
      <h2> Spoken Languages</h2>
      <ul>
        {countrySolo.languages.map(lang => <li key={lang.name}> {lang.name} </li>)}
      </ul>
      <img src={countrySolo.flag} alt="" style={{height: '150px'}}/>
      <h2> Weather in {countrySolo.capital}</h2>
      {/* <p> Temperature: {weather.current.temperature} Celsius</p>
      <img src={weather.current.weather_icons[0]} alt="" style={{height: '100px'}}/>
      <p> Wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p> */}
    </>
  )
}
const CountryList = ({countries, changeFilter}) => {
  if (!countries) {
    return (
      <p> Too many matches, specify another filter</p>
    )
  }
  if (countries.length === 1) {
    return (
      <CountrySolo countrySolo={countries[0]}/>
    )
  }
  else {
    return (
      <>
        {countries.map(con => <p key={con.name}> {con.name} <button onClick={() => changeFilter(con.name)}> show </button></p>)}
      </>
    ) 
  }
}
const App = () => {
  const [countries, setCountries ] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = () => {
    const newCon = countries.filter(country => country.name.includes(filter))
    if (newCon.length > 10) {
      return false
    }
    else {
      return newCon
    }
  }

  return (
    <>
    <div>
      Find countries: <input value={filter} onChange={handleFilterChange}/>
      <CountryList countries={countriesToShow()} changeFilter={setFilter}/>
    </div>
    </>
  );
}

export default App;
