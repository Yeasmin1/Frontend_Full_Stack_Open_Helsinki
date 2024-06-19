const PersonForm =({newName,newNumber,addName,handleNameChange,handleNumberChange})=> {
    return(
        <div>
            <form onSubmit={addName}>
                <div>
                    name:
                    <input
                        value={newName}
                        //registered an event handler to 
                        //the onChange attribute of the 
                        //form's input element
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    number:
                    <input 
                        value={newNumber}
                        onChange={handleNumberChange}
                    />
                </div>
                <button type="submit">add</button>
            </form> 
        </div>
    )
}
export default PersonForm;