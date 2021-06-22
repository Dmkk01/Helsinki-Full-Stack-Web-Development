import React from 'react'
import { useSelector } from 'react-redux'
import { connect } from "react-redux";

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification !== null) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
  else {
    return null
  }
  
}

const mapStateToProps = (state) => ({ notification: state.notification });

const connectedNotification = connect(mapStateToProps)(Notification);

export default connectedNotification;