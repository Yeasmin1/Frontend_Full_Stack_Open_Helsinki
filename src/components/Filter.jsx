import PropTypes from 'prop-types';
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

Filter.propTypes = {
    filteredInputName: PropTypes.string.isRequired,
    handleFilteredInputChange: PropTypes.func.isRequired,
};
  
export default Filter;