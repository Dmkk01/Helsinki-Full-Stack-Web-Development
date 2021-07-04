const {ApolloServer, gql, UserInputError, AuthenticationError} = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')

const JWT_SECRET = 'Insanely secret code'
const MONGODB_URI = 'mongodb+srv://helsinkifullstack:reactdev@helsinkiwebdevelopment.tdi9t.mongodb.net/library-app?retryWrites=true&w=majority'

console.log('connecting to:', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('connection failed', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author]
      me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Author: {
    bookCount: (root) => Book.find({ author: root.id }).countDocuments()
  },
  Query: {
      me: (root, args, { currentUser }) => currentUser,
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: (root, args) => {
        const genre = args.genre
        const author = args.author
        const query_args = {}
  
        if (genre) query_args.genres = { $in: [genre] }
        if (author) query_args.author = { $eq: author }
  
        return Book.find(query_args).populate('author')
      },
      allAuthors: () => {
        const authors = await Author.find({})
        const books = await Book.find({})
        return authors.map((author) => {
          const bcount = books.reduce( (a, book) => (book.author == author.name ? a + 1 : a),0)
          return { name: author.name, id: author._id, born: author.born, bcount}})
        }
  },
  Mutation: {
      addBook: (root, args, context) => {
        if (!context.currentUser) throw new AuthenticationError("you need to be logged in")
        let check = Book.find({ title: args.title }).countDocuments()
        if (check != 0) throw new UserInputError("Book already exists", { title: args.title })
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          new_author = new Author({ name: args.author })
        }
        const new_book = new Book({ ...args, author: new_author })
        try {
          await new_book.save()
          await new_author.save()
        } catch (err) {
          throw new UserInputError(err.message, { invalidArgs: args })
        }
        return new_book
      },
      editAuthor: (root, args, context) => {
        if (!context.currentUser) throw new AuthenticationError("you need to be logged in")
        let edit_author = await Author.findOne({ name: args.name })
        if (!author) return null
        edit_author.born = args.setBornTo
        try {
          await edit_author.save()
        } catch (err) {
          throw new UserInputError(err.message, { invalidArgs: args })
        }
        return edit_author
      },
      createUser: async (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
        try {
          await user.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
        return user
      },
      login: async (root, args) => {
        const username = args.username
        const user = await User.findOne({ username })
        if (!user) {
          throw new UserInputError("user like this does not exist", username)
        } else if (args.password !== 'password') {
          throw new UserInputError("wrong password", username)
        }
        const userForToken = {
          username: user.username,
          id: user._id,
        }
        return { value: jwt.sign(userForToken, JWT_SECRET) }
      }
   }
 
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodeToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findOne({ username: decodeToken.username })
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})