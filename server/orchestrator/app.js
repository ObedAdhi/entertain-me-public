const { ApolloServer, makeExecutableSchema } = require("apollo-server")
const movieSchema = require('./schemas/movieSchema')
const tvseriesSchema = require('./schemas/tvseriesSchema')

const typeDefs = `
  type Query
  type Mutation
`

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, movieSchema.typeDefs, tvseriesSchema.typeDefs],
  resolvers: [movieSchema.resolvers, tvseriesSchema.resolvers]
})


const server = new ApolloServer({schema})

server.listen().then(({ url }) => {
  console.log('Server ready at: ', url);
})