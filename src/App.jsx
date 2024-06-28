import {useState , useEffect} from 'react'
import personService from './services/personService'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notifications from './components/Notifications'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] =useState('')
  const [filteredInputName, setFilteredInputName] = useState('');
  const [filteredPersons, setFilteredPersons ] = useState([persons])
  const [notification, setNotification] = useState({ message: null, type: '' });

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(createdPerson => {
        console.log('promise fulfilled')
        setPersons(createdPerson)
      })
      .catch(error => {
         // this is the way to access the error message
        console.log(error.response.data.error)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber
    }
    const nameExists= persons.find(person => person.name === newName)
    if (nameExists){
      window.confirm(`${newName} is already added to phonebook, replace the
      old number with a new one?`)
       personService
        .update(nameExists.id, {...nameExists,number:newNumber})
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== nameExists.id ? person : returnedPerson))
          setNewNumber('')
        })   
        .catch(error => {
          showNotification(`Information of ${newName} has already been removed from server`, 'error');
        }); 
    }
    else{
      personService
      .create(newObject)
      .then(returnedPerson => {
        console.log('new person add',returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        showNotification(`Failed to add ${newName}`, 'error');
      });
    } 
  }
  
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null});
    }, 5000);
  };
  const showErrorNotification = (message) => {
    setNotification({ message});
  };

  const handleFilteredInputChange = (event) => {
    setFilteredInputName(event.target.value)
    const searchPerson=event.target.value
    const filteredItems = persons.filter((person)=> 
      person.name && person.name.toLowerCase().includes(searchPerson.toLowerCase()))
    console.log('event handler')
    console.log(filteredItems)
    setFilteredPersons(filteredItems) 
  };
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const deletePerson = (id) => {
    const person = persons.find(c => c.id === id);
    if (person && window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(c => c.id !== id));
        showNotification(`Deleted ${person.name}`, 'success');
      }).catch(error => {
        showErrorNotification(`Failed to delete ${person.name} (frontend)`, 'error');
      }); 
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notifications message={notification.message} type={notification.type} />
      <Filter 
        filteredInputName = {filteredInputName}
        handleFilteredInputChange ={handleFilteredInputChange} 
      />
      <h3>Add a new</h3>
      <PersonForm
         newName= {newName}
         newNumber = {newNumber}
         handleNameChange = {handleNameChange}
         handleNumberChange = {handleNumberChange}
         addName = {addName}
      />
      <h3>Numbers</h3>
      <Persons
        filteredPersons = {filteredPersons} deletePerson={deletePerson}
      />
    </div>
  )
}
export default App;