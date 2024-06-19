const Filter =({ filteredInputName,handleFilteredInputChange})=> {
        return(
            <div>
                filter shown with
                <input
                    value={filteredInputName}
                    onChange={handleFilteredInputChange }
                />
            </div>
        )
}
export default Filter;