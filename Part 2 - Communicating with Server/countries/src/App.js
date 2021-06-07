import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountrySolo = ({countrySolo}) => {
  return (
    <>
      <h1> {countrySolo.name}</h1>
      <p> Capital: {countrySolo.capital}</p>
      <p> Population: {countrySolo.population}</p>
      <p> Languages</p>
      <ul>
        {countrySolo.languages.map(lang => <li key={lang.name}> {lang.name} </li>)}
      </ul>
      <img src={countrySolo.flag} alt="" style={{height: '150px'}}/>
    </>
  )
}
const CountryList = ({countries}) => {
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
        {countries.map(con => <p key={con.name}> {con.name}</p>)}
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
      <CountryList countries={countriesToShow()}/>
    </div>
    </>
  );
}

export default App;
