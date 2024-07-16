import PropTypes from 'prop-types';
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

PersonForm.propTypes = {
    newName: PropTypes.string.isRequired,
    newNumber: PropTypes.string.isRequired,
    addName: PropTypes.func.isRequired,
    handleNameChange: PropTypes.func.isRequired,
    handleNumberChange: PropTypes.func.isRequired,
  };
  
export default PersonForm;