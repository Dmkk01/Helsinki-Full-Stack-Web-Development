import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
            id
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks { 
            title 
            author
            published 
        }
    }
`

export const ADD_BOOK = gql`
    mutation addBook($title: String!, $author: String!, $integerPublished: Int!, $genres: [String!]!) {
        addBook(
            title: $title,
            author: $author,
            published: $integerPublished,
            genres: $genres
        )   {
            title
            author
            published
            genres
        }
    }
`

export const EDIT_AUTHOR = gql`
  mutation updateAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`

export const BOOKS_BY_GENRE = gql`
query getAllBooks($genre: String) {
  allBooks(genre: $genre) {
    title
    published
    author {
      name
    }
    genres
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const FAVORITE_GENRE = gql`{ me { favoriteGenre } }`