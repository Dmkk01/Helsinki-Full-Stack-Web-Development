import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { connect } from "react-redux";
import { addVote } from '../reducers/anecdoteReducer'
import Filter from './Filter'
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {

    // const anecdotes = useSelector((state) => {
    //     return state.anecdotes.filter((a) => a.content.toLowerCase()
    //                                           .includes(state.filter.toLowerCase()))
    //                                           .sort((a, b) => b.votes - a.votes); 
    //   });
    // const dispatch = useDispatch()

    // function vote(id, content) {
    //     dispatch(addVote(id))
    //     dispatch(setNotification(`You voted: ${content}`, 2));
    // }

    const vote = (id) => {
        props.addVote(id);
        const content = props.anecdotes.find((a) => a.id === id).content;
        props.setNotification(`You voted for: ${content}`, 5);
      };

    return (
        <>
            <Filter />
            {props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

const mapStateToProps = (state) => {
    if (state.filter === "") {return {anecdotes: state.anecdotes.sort((a, b) => b.votes - a.votes),};}

    const filterAnecdotes = (anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase());

    return {anecdotes: state.anecdotes.filter(filterAnecdotes).sort((a, b) => b.votes - a.votes),};
  };
  
  const mapDispatchToProps = {setNotification, addVote,};
  
  const connectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
  
  export default connectedAnecdoteList;