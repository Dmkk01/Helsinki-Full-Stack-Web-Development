export const displayNotification = (message) => ({
    type: "DISPLAY",
    data: message,
  });

  export const clearNotification = (notification) => ({
    type: "CLEAR",
  });

  
  
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