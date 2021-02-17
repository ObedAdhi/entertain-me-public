import { gql } from "@apollo/client"

const GET_ALL = gql`
  query getAll{
    movies {
      _id, title, popularity, tags, poster_path
    },
    tvseries {
      _id, title, popularity, tags, poster_path
    }
  }
`

const get_movie = gql`
  query getMovie($id: ID) {
    movie(_id: $id) {
      _id, title, overview, poster_path, popularity, tags
    }
  }
`

const Add_Movie = gql`
  mutation AddMovie($newMovie: MovieInput){
    addMovie(data: $newMovie){
      _id
      title
    }
  }
`

const Update_Movie = gql`
  mutation update($id: ID, $newMovie: MovieInput){
    updateMovie(_id: $id, data: $newMovie){
      _id
    }
  }
`

const Delete_Movie = gql`
  mutation DeleteMovie($id: ID){
    deleteMovie(_id: $id){
      OK
    }
  }
`

const Get_Collection_Movie = gql`
query GetCollectionMovie {
  collectionMovie @client
}
`

export {
  GET_ALL,
  get_movie,
  Add_Movie,
  Delete_Movie,
  Update_Movie,
  Get_Collection_Movie
}