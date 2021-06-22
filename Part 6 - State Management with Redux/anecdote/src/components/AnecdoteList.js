import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import Filter from './Filter'
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {

    const anecdotes = useSelector((state) => {
        return state.anecdotes.filter((a) => a.content.toLowerCase()
                                              .includes(state.filter.toLowerCase()))
                                              .sort((a, b) => b.votes - a.votes); 
      });
    const dispatch = useDispatch()

    function vote(id, content) {
        dispatch(addVote(id))
        dispatch(setNotification(`You voted: ${content}`, 2));
    }
    return (
        <>
            <Filter />
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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

export default AnecdoteList