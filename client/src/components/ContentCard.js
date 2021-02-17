import { useMutation, useQuery } from "@apollo/client"
import { useHistory } from "react-router-dom";
import { GET_ALL, Delete_Movie, Get_Collection_Movie } from "../config/query";
import { collectionMovieVar } from "../config/cache";
import { useEffect } from "react";


function ContentCard (props) {
  const id = props.props._id
  const history = useHistory()
  const { data, loading, error, startPolling, stopPolling } = useQuery(Get_Collection_Movie)
  const [deleteMovie, { data: del }] = useMutation(Delete_Movie, {
    refetchQueries: [
      { query: GET_ALL }
    ]
  })

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  });

  function handleDelete () {
    deleteMovie({
      variables: {
        id
      }
    })
  }

  function handleToDetail () {
    history.push(`/movies/${id}`)
  }

  function toEditPage (id) {
    history.push(`/movies/edit/${id}`)
  }

  function handleAddFav () {
    if ((data.collectionMovie.findIndex(element => element._id === props.props._id)) === -1 ) {
      const currentCollection = collectionMovieVar()
      collectionMovieVar([...currentCollection, props.props])

    }
  }

  return (
    <div className={'col-3 m-0 ps-2'} style={{display: 'inline-block', paddingTop: '40px'}}>
      <img style={{maxWidth: '250px', width: '250px', borderRadius: '7%'}} src={props.props.poster_path} alt=""></img>
      <h5 className={'pt-3'} key={props.props._id}>{props.props.title}</h5> 
      <p className={''}><span style={{fontSize: '15px'}} className="material-icons m-0 pt-1">star_rate</span>Rating: {props.props.popularity}</p>
      <div className={'mb-3 '}>
        <button className={'btn btn-primary btn-sm me-2'} onClick={() => toEditPage(props.props._id)}>
          <span className="material-icons pt-1 " style={{fontSize: '18px'}}>edit</span></button>
        <button className={'btn btn-primary btn-sm me-2'} onClick={() => handleToDetail()}>
          <span className="material-icons pt-1 " style={{fontSize: '18px'}}>description</span></button>
        <button className={'btn btn-danger btn-sm me-2'} onClick={() => handleDelete()}>
          <span className="material-icons pt-1 " style={{fontSize: '18px'}}>delete</span></button>
        <button className={'btn btn-danger btn-sm'} style={{backgroundColor: 'white'}} onClick={() => handleAddFav()}>
          <span className="material-icons pt-1" style={{fontSize: '18px', color: 'pink'}}>favorite</span></button>
      </div>
    </div>
  )
}

export default ContentCard