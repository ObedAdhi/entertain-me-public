const { gql } = require("apollo-server")
const axios = require("axios")
const url = 'http://localhost:4001/movies'
const redis = require('../helpers/redis')

const typeDefs = gql`
  type Movie {
    _id: ID,
    title: String,
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  }
  
  input MovieInput {
    title: String!,
    overview: String!,
    poster_path: String!,
    popularity: Float!,
    tags: [String]!
  }

  type DeleteResponse {
    OK: Boolean!
  }
  
  extend type Query {
    movies: [Movie]
    movie(_id: ID): Movie
  }

  extend type Mutation {
    addMovie(data: MovieInput) : Movie
    updateMovie(_id: ID, data: MovieInput) : Movie
    deleteMovie(_id: ID) : DeleteResponse
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
            url
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

    movie: (_, args) => {
      const { _id } = args
      return axios({

        method: 'GET',
        url: `${url}/${_id}`
      })
        .then(({data}) => {
          return data
        })
        .catch(err => {
          console.log(err);
        })
    },

  },

  Mutation: {
    addMovie: async (parent, args, context, info) => {
      try {
        const {
          title, overview, poster_path, popularity, tags
        } = args.data
  
        return axios({
          method: "POST",
          url,
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

    updateMovie: async (parent, args, context, info) => {
      try {
        const {
          title, overview, poster_path, popularity, tags
        } = args.data
        const { _id } = args
  
        return axios({
          method: "PUT",
          url: `${url}/${_id}`,
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

    deleteMovie: async (parent, args, context, info) => {
      try {
        const { _id } = args
  
        return axios({
          method: "DELETE",
          url: `${url}/${_id}`,
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

  }
}

module.exports = {
  typeDefs,
  resolvers
}