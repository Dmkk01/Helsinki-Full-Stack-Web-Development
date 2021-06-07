import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Persons = ({persons}) => {
  return (
    <>
    {persons.map(person => <Person name={person.name} number={person.number} key={person.name}/>)}
    </>
  )
}
const Person = ({name, number}) => {
  return (
    <p> {name} {number}</p>
  )
}

const Filter = ({filter, handleFilter}) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilter}/>
    </div>
  )
}

const Form = ({addPerson, newName, handlePersonChange, newNumber, handlePhoneChange}) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')


  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    let check = persons.filter( person => (person.name === newName))
    if (check.length !== 0) {
      window.alert(`${newName} is already added to phonebook`);
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = () => {
    if (filter.length === 0) {
      return persons
    }
    else {
      return persons.filter(person => person.name.includes(filter))
    }   
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h2> Add a new</h2>
      <Form addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} 
            newNumber={newNumber}  handlePhoneChange={handlePhoneChange}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow()}/>
    </div>
  )
}

export default App