import { ApolloClient, InMemoryCache } from "@apollo/client";
import { collectionMovieVar } from "./cache";

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          collectionMovie: {
            read() {
              return collectionMovieVar()
            }
          }
        }
      }
    }
  })
})

export default client