import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const toChange = state.find(n => n.id === id)
      const changedAnecdote = {...toChange, votes: toChange.votes + 1}
      return state.map(x => x.id !== id ? x : changedAnecdote)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: {id}
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: content
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export default reducer