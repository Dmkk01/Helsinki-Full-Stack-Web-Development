import React from 'react'
// import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux"

const AnecdoteForm = (props) => {
    // const dispatch = useDispatch()

    // const addAnecdote = async (event) => {
    //     event.preventDefault()
    //     const content = event.target.anecdote.value
    //     event.target.anecdote.value = ''
    //     dispatch(createAnecdote(content))
    //     dispatch(setNotification(`Created new anecdote: ${content}`, 5));
    //   }

    const addAnecdote = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        props.createAnecdote(content);
        props.setNotification(`Created new anecdote: ${content}`, 5);
      };
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

const mapDispatchToProps = {
    createAnecdote,
    setNotification,
  };
  
  const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
  export default connectedAnecdoteForm;