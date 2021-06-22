import React from 'react'
// import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { updateFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  // const dispatch = useDispatch()
  // const handleChange = (event) => {
  //   const filterInput = event.target.value;
  //   dispatch(updateFilter(filterInput));
  // }
  const handleChange = (event) => {
    const filterInput = event.target.value;
    props.updateFilter(filterInput);
  };
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const connectedFilter = connect(null, { updateFilter })(Filter);

export default connectedFilter;