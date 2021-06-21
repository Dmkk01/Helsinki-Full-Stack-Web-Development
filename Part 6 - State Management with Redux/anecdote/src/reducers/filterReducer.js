export const updateFilter = (filterInput) => ({
    type: "FILTER",
    data: filterInput,
  });
  
  const filterReducer = (state = "", action) => {
    switch (action.type) {
      case "FILTER":
        return action.data;
      default:
        return state;
    }
  };
  
  export default filterReducer;