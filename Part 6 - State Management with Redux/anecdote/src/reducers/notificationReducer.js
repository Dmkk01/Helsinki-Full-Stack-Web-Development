export const setNotification = (message, duration) => {
  return async (dispatch) => {
    dispatch({
      type: "DISPLAY",
      data: message,
    });
    setTimeout(() => dispatch({type: "CLEAR"}) , duration * 1000);
  };
};
  
  
  const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case "DISPLAY":
        return action.data;
      case "CLEAR":
          return null;
      default:
        return state;
    }
  };
  
  export default notificationReducer;