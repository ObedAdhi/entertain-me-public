const { gql } = require("apollo-server")
const axios = require("axios")
const url = 'http://localhost:4002/tvseries'
const redis = require('../helpers/redis')

const typeDefs = gql`
  type TVSeries {
    _id: ID,
    title: String,
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  }

  input TVSeriesInput {
    title: String!,
    overview: String!,
    poster_path: String!,
    popularity: Float!,
    tags: [String]!
  }
  
  extend type Query {
    tvseries: [TVSeries]
    onetvseries(_id: ID): TVSeries
  }
  
  extend type Mutation {
    addTVSeries(data: TVSeriesInput) : TVSeries
    updateTVSeries(_id: ID, data: TVSeriesInput) : TVSeries
    deleteTVSeries(_id: ID) : DeleteResponse
  }
`

const resolvers = {
  Query: {
    tvseries: async () => {
      try {
        const tvseriesCachedData = await redis.get('data:tvseries')

        if (tvseriesCachedData) {
          console.log("dari cached");
          return JSON.parse(tvseriesCachedData)
        } else {
          return axios({
            method: 'GET',
            url
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

    onetvseries: (_, args) => {
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
    }
  },

  Mutation: {
    addTVSeries: async (parent, args, context, info) => {
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
   
    updateTVSeries: async (parent, args, context, info) => {
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

    deleteTVSeries: async (parent, args, context, info) => {
      try {
        const { _id } = args
  
        return axios({
          method: "DELETE",
          url: `${url}/${_id}`,
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

module.exports = {
  typeDefs,
  resolvers
}