'JSON server' is the server for this project
## to run Js server
json-server --port 3001 --watch db.json
not global:
npx json-server --port 3001 --watch db.json
# js engine or run time environment follow the asynchronous model.
# js engines are single-threaded, they can not execute code parallel- it is required to use a non-blocking model for executing IO operations.Otherwise, the browser would "freeze" during, for instance, the fetching of data from a server.
## son-server as a development dependency (only used during development) by executing the command:
npm install json-server --save-dev

## axios is installed as a runtime dependency of the application because the execution of the program requires the existence of the library. On the other hand, json-server was installed as a development dependency (--save-dev), since the program itself doesn't require it. It is used for assistance during software development.
npm install axios
npm install json-server --save-dev

## Axios : 'Axios' method get returns a promise.
have three states:
-promise fulfilled: operation has been completed and final value is available. successful operation.(also called resolved)
-pending:  the final value (one of the following two is not availavle yet:fullfilled/rejected)
-rejected: an error prevented the final value from being determined. represents a failed operation.
 # to access the result of the Axios operation, we must register an event handler to the promise.
 example: 
 const promise = axios.get('http://localhost:3001/notes')

promise.then(response => {
  console.log(response)
})

import axios from 'axios'

//The JavaScript runtime environment calls 
//the callback function registered by the 
//then method providing it with a response 
//object as a parameter. The response object 
//contains all the essential data related to the 
//response of an HTTP GET request, which would 
//include the returned data, status code, and headers.
//Storing the promise object in a variable is 
//generally unnecessary, and it's instead common 
//to chain the then method call to the axios method 
//call, so that it follows it directly:
axios.get('http://localhost:3001/persons')
.then(response =>{
  const persons = response.data
  console.log("data fetching",persons)

})

## effects
Effects let a component connect to and synchronize with external systems. This includes dealing with network, browser DOM, animations, widgets written using a different UI library, and other non-React code.

## useEffects
useEffect always executed after the first render of the component.
he App component changes as follows:

import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  // ...
}copy
We have also added a few helpful prints, which clarify the progression of the execution.

This is printed to the console:

render 0 notes
effect
promise fulfilled
render 3 notes
copy
First, the body of the function defining the component is executed and the component is rendered for the first time. At this point render 0 notes is printed, meaning data hasn't been fetched from the server yet.

The following function, or effect in React parlance:

() => {
  console.log('effect')
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
}copy
is executed immediately after rendering. The execution of the function results in effect being printed to the console, and the command axios.get initiates the fetching of data from the server as well as registers the following function as an event handler for the operation:

response => {
  console.log('promise fulfilled')
  setNotes(response.data)
}
When data arrives from the server, the JavaScript runtime calls the function registered as the event handler, which prints promise fulfilled to the console and stores the notes received from the server into the state using the function setNotes(response.data).

As always, a call to a state-updating function triggers the re-rendering of the component. As a result, render 3 notes is printed to the console, and the notes fetched from the server are rendered to the screen.

Finally, let's take a look at the definition of the effect hook as a whole:

useEffect(() => {
  console.log('effect')
  axios
    .get('http://localhost:3001/notes').then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
}, [])copy

## useEffects takes two parameters
-The first is a function, the effect itself. According to the documentation:
By default, effects run after every completed render, but you can choose to fire it only when certain values have changed.

-The second parameter of useEffect is used to specify how often the effect is run. If the second parameter is an empty array [], then the effect is only run along with the first render of the component.

## description for the pictute
The JavaScript code making up our React application is run in the browser. The browser gets the JavaScript from the React dev server, which is the application that runs after running the command npm run dev. The dev-server transforms the JavaScript into a format understood by the browser. Among other things, it stitches together JavaScript from different files into one file. We'll discuss the dev-server in more detail in part 7 of the course.

The React application running in the browser fetches the JSON formatted data from json-server running on port 3001 on the machine. The server we query the data from - json-server - gets its data from the file db.json.

At this point in development, all the parts of the application happen to reside on the software developer's machine, otherwise known as localhost. The situation changes when the application is deployed to the internet

### 