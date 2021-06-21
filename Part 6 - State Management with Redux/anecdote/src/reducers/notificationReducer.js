export const displayNotification = (message) => ({
    type: "DISPLAY",
    data: message,
  });
  
  
  const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case "DISPLAY":
        return action.data;
      default:
        return state;
    }
  };
  
  export default notificationReducer;