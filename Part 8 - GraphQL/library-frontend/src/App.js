import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { EDIT_AUTHOR, CREATE_BOOK, FAVORITE_GENRE, ALL_BOOKS, ALL_AUTHORS, LOGIN} from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState('')

  const client = useApolloClient();
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const favoriteGenre = useQuery(FAVORITE_GENRE)
  const addBook = useMutation(CREATE_BOOK, { refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }] })
  const login = useMutation(LOGIN)

  const navs = [
    { name: 'authors', label: 'authors', whenLogged: false },
    { name: 'books', label: 'books', whenLogged: false },
    { name: 'add', label: 'add book', whenLogged: true },
    { name: 'recommend', label: 'recommended', whenLogged: false }]

  return (
    <div>
      <div>
        <Login client={client} login={login} token={token} setToken={setToken} />
      </div>
      <div>
        {navs.map(n => {
          if ((token && n.whenLogged) || !n.whenLogged) {
            return (<button key={n.name} onClick={() => setPage(n.name)}>{n.label}</button>)
          }
          return null
        })}
      </div>
      <Authors show={page === 'authors'} />
      <Books client={client} show={page === 'books'} result={books} />
      <NewBook show={page === 'add'} addBook={addBook} />
      <Recommend show={page === 'recommend'} resultBooks={books} resultGenre={favoriteGenre} />
    </div>
  )
}

export default App