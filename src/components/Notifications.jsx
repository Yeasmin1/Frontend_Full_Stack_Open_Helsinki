import PropTypes from 'prop-types';
const Notifications = ({message, type}) => {
    if (message === null){
        return null
    }
    const notificationStyle = {
        color: type === 'success' ? 'green' : 'red',
        background: 'lightgrey',
        fontSize: '20px',
        border: `2px solid ${type === 'success' ? 'green' : 'red'}`,
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
      };
    return (
        <div style={notificationStyle}>
            {message}
        </div>   
    )
}

Notifications.propTypes = {
    message: PropTypes.string,
    type: PropTypes.oneOf(['success', 'error']),
  };
  
export default Notifications;