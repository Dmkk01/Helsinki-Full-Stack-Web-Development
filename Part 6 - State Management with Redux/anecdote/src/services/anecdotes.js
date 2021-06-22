import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const anecdoteObject = { content, votes: 0, id: getId() };
    const response = await axios.post(baseUrl, anecdoteObject);
    return response.data;
  };

const addVote = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    const anecdoteObject = { ...response.data, votes: response.data.votes + 1 }
    const response2 = await axios.put(`${baseUrl}/${id}`, anecdoteObject);
    return response2.data;
}


export default { getAll, createNew, addVote }