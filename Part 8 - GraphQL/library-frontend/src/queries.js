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