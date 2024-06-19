const Persons = ({filteredPersons, deletePerson}) => {
    console.log('seraching here in the persons file', filteredPersons)
    // Check if items is defined and not empty
    if (!Array.isArray(filteredPersons) || filteredPersons.length === 0) {
        return <p>Loading persons...</p>; // Display a loading message or spinner
    }
    return(
        <div>
            <ul>
                {filteredPersons.map((filterPerson, index) => (
                    <li key={index}>
                        {filterPerson.name}{filterPerson.number}
                        <button onClick={()=> deletePerson(filterPerson.id)}>
                            delete
                        </button> 
                    </li>         
                ))}
            </ul>     
        </div>
    )
}
export default Persons;