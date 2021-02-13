const { ApolloServer, gql } = require("apollo-server")
const axios = require("axios")
const Redis = require('ioredis')
const redis = new Redis()

const typeDefs = gql`
  type Movie {
    _id: ID,
    title: String,
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  }

  type TVSeries {
    _id: ID,
    title: String,
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  }

  type Query {
    movies: [Movie]
    tvseries: [TVSeries]
    movie(_id: ID): Movie
    onetvseries(_id: ID): TVSeries
  }

  input MovieInput {
    title: String!,
    overview: String!,
    poster_path: String!,
    popularity: Float!,
    tags: [String]!
  }

  input TVSeriesInput {
    title: String!,
    overview: String!,
    poster_path: String!,
    popularity: Float!,
    tags: [String]!
  }

  type DeleteResponse {
    OK: Boolean!
  }

  type Mutation {
    addMovie(data: MovieInput) : Movie
    addTVSeries(data: TVSeriesInput) : TVSeries
    updateMovie(_id: ID, data: MovieInput) : Movie
    updateTVSeries(_id: ID, data: TVSeriesInput) : TVSeries
    deleteMovie(_id: ID) : DeleteResponse
    deleteTVSeries(_id: ID) : DeleteResponse
  }
`

const resolvers = {
  Query: {
    movies: async () => {
      try {
        const moviesCachedData = await redis.get('data:movies')
  
        if (moviesCachedData) {
          console.log("dari cached");
          return JSON.parse(moviesCachedData)
        } else {
          return axios({
            method: 'GET',
            url: 'http://localhost:4001/movies'
          })
            .then(({data}) => {
              console.log("dari server");
              redis.set("data:movies", JSON.stringify(data))
              return data
            })
            .catch(err => {
              console.log(err);
            })
        }
      } catch (error) {
        console.log(err);
      }

    },

    tvseries: async () => {
      try {
        const tvseriesCachedData = await redis.get('data:tvseries')

        if (tvseriesCachedData) {
          console.log("dari cached");
          return JSON.parse(tvseriesCachedData)
        } else {
          return axios({
            method: 'GET',
            url: 'http://localhost:4002/tvseries'
          })
            .then(({data}) => {
              console.log("dari server");
              redis.set("data:tvseries", JSON.stringify(data))
              return data
            })
            .catch(err => {
              console.log(err);
            })
        }
      } catch (error) {
        console.log(err);
      }
    },

    movie: (_, args) => {
      const { _id } = args
      return axios({

        method: 'GET',
        url: `http://localhost:4001/movies/${_id}`
      })
        .then(({data}) => {
          return data
        })
        .catch(err => {
          console.log(err);
        })
      },

    onetvseries: (_, args) => {
      const { _id } = args
      return axios({

        method: 'GET',
        url: `http://localhost:4002/tvseries/${_id}`
      })
        .then(({data}) => {
          return data
        })
        .catch(err => {
          console.log(err);
        })
      }
  },

  Mutation: {
    addMovie: async (parent, args, context, info) => {
      try {
        const {
          title, overview, poster_path, popularity, tags
        } = args.data
  
        return axios({
          method: "POST",
          url: 'http://localhost:4001/movies',
          data: { title, overview, poster_path, popularity, tags }
        })
          .then(({data}) => {
            redis.del('data:movies')
            return data
          })
          .catch(err => {
            console.log(err);
          })
      } catch (error) {
        console.log(err);
      }
    },
    addTVSeries: async (parent, args, context, info) => {
      try {
        const {
          title, overview, poster_path, popularity, tags
        } = args.data
  
        return axios({
          method: "POST",
          url: 'http://localhost:4002/tvseries',
          data: { title, overview, poster_path, popularity, tags }
        })
          .then(({data}) => {
            redis.del('data:tvseries')
            return data
          })
          .catch(err => {
            console.log(err);
          })
      } catch (error) {
        console.log(err);
      }
    },
    updateMovie: async (parent, args, context, info) => {
      try {
        const {
          title, overview, poster_path, popularity, tags
        } = args.data
        const { _id } = args
  
        return axios({
          method: "PUT",
          url: `http://localhost:4001/movies/${_id}`,
          data: { title, overview, poster_path, popularity, tags }
        })
          .then(({data}) => {
            redis.del('data:movies')
            console.log(data);
            return data.message
          })
          .catch(err => {
            console.log(err);
          })
      } catch (error) {
        console.log(err);
      }
    },
    updateTVSeries: async (parent, args, context, info) => {
      try {
        const {
          title, overview, poster_path, popularity, tags
        } = args.data
        const { _id } = args
  
        return axios({
          method: "PUT",
          url: `http://localhost:4002/tvseries/${_id}`,
          data: { title, overview, poster_path, popularity, tags }
        })
          .then(({data}) => {
            redis.del('data:tvseries')
            console.log(data.message);
            return data.message
          })
          .catch(err => {
            console.log(err);
          })
      } catch (error) {
        console.log(err);
      }
    },
    deleteMovie: async (parent, args, context, info) => {
      try {
        const { _id } = args
  
        return axios({
          method: "DELETE",
          url: `http://localhost:4001/movies/${_id}`,
        })
          .then(({data}) => {
            redis.del('data:movies')
            console.log(data);
            return data.message
          })
          .catch(err => {
            console.log(err);
          })
      } catch (error) {
        console.log(err);
      }
    },
    deleteTVSeries: async (parent, args, context, info) => {
      try {
        const { _id } = args
  
        return axios({
          method: "DELETE",
          url: `http://localhost:4002/tvseries/${_id}`,
        })
          .then(({data}) => {
            redis.del('data:tvseries')
            console.log(data);
            return data.message
          })
          .catch(err => {
            console.log(err);
          })
      } catch (error) {
        console.log(err);
      }
    }


  }
}


const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({ url }) => {
  console.log('server ready at: ', url);
})