import {useState , useEffect} from 'react'
import personService from './services/personService'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notifications from './components/Notifications'
const App = () => {
  const [persons, setPersons] = useState([])
  //newName is a state for storing the user-submitted input
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] =useState('')
  const [filteredInputName, setFilteredInputName] = useState('');
  const [filteredPersons, setFilteredPersons ] = useState([persons])
  const [notification, setNotification] = useState({ message: null, type: '' });

  //First, the body of the function defining
  // the component is executed and the component 
  //is rendered for the first time. At this point 
  //render 0 notes is printed, meaning data hasn't 
  //been fetched from the server yet.
  //Then useEffects function is executed immedietly after rendering
  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

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
  
  //this is an HTML form to the component that is used to add new names
  //addName is the event handler to the form element that will be called 
  //when the form will be submitted, by clicking the submit button
  //event parameter is the event that triggers 
  //the call to the event handler function
  const addName = (event) => {
    //preventDefault is called by the event handler immedietly to
    //prevents the default action of submitting a form. The default 
    //action would, among other things, cause the page to reload.
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber
    }
    //.find method returns the first element in the array 
    //that satisfies the provided testing function.
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
    //First, we create a new object for the name called newObject that will
    // receive its content from the component's newName state.  
    //This method works for our application since names are never deleted. 
    //The new names is added to the 
    //list of names using the concat array method
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
    
    //The method does not mutate the original notes array, 
    //but rather creates a new copy of the array with the new 
    //item added to the end. This is important since we must never 
    //mutate state directly in React!
    //setPersons(persons.concat(newObject))
    //The event handler also resets the value of the 
    //controlled input element by calling the setNewNote function 
    //of the newNote state:
    //setNewName('')
    //setNewNumber('')
  }
  //To enable editing of the input 
  //element, we register an 
  //event handler that synchronizes the
  // changes made to the input with the 
  //component's state:
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
        showErrorNotification(`Failed to delete ${person.name}`, 'error');
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