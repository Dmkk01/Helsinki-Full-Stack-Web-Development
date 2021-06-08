import React, { useState, useEffect } from 'react'
import personService from './services/persons'


const Persons = ({persons, del}) => {
  return (
    <>
    {persons.map((person, index) => <Person name={person.name} number={person.number} 
                                            key={index} del={del} index={index}/>)}
    </>
  )
}
const Person = ({name, number, del, index}) => {
  return (
    <p> {name} {number} <button onClick={() => del(name, index + 1)}> delete</button></p>
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


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="msg">
      {message}
    </div>
  )
}



const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
    })
  }, [])

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
    if (check.length !== 0 ) {
      if (check[0].number === newNumber) {
        window.alert(`${newName} is already added to phonebook`);
      }
      else {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)) {
          const per = persons.find( n => n.name === newName)
          const changedPerson = { ...per, number: newNumber}
          personService
            .update(per.id, changedPerson)
            .then(returned => {
              setPersons(persons.map(person => person.id !== per.id ? person : returned))
            })
          setNewName('')
          setNewNumber('')
          displayMessage(changedPerson.name)
        }
      }
      } 
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
      .create(personObject)
        .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
        setNewName('')
        setNewNumber('')
      })
      displayMessage(personObject.name)
    }
  }

  const personsToShow = () => {
    if (filter.length === 0) {
      return persons
    }
    else {
      return persons.filter(person => person.name.includes(filter))
    }   
  }

  const del = (name, id) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.deletePerson(id)
      setPersons(persons.filter(n => n.id !== id))
    }
  }

  const displayMessage = (name) => {
    setErrorMessage(
      `Added ${name}`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h2> Add a new</h2>
      <Form addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} 
            newNumber={newNumber}  handlePhoneChange={handlePhoneChange}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow()} del={del}/>
    </div>
  )
}

export default App