import { useQuery } from "@apollo/client"
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ContentCard from '../components/ContentCard'
import { GET_ALL } from "../config/query";



function MovieList () {
  const { data, loading, error, stopPolling, startPolling } = useQuery(GET_ALL)
  const history = useHistory()


  function toAddForm() {
    history.push('/movies/add')
  }

  if (error) {
    return (
      <div>
        error nih
      </div>
    )
  } else if (loading) {
    return (
      <div 
        className={'container text-center'}
        style={{marginTop: '160px'}}>
        <h3>Loading . . .</h3>
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={'container mt-4 mb-5'}>
        <div className={'row'}>
          
          <h4 className={'mb-3'}> Movie List </h4>
          <button onClick={() => toAddForm()} className={'ms-3 mb-3 btn btn-primary col-1'}>Add Movie</button>

          <div className={'row rounded text-center'} style={{overflowX: 'auto', display: 'block', whiteSpace: 'nowrap', backgroundColor: '#d4d4d4'}}>
            {data.movies.map(movie => {
              return (
                <ContentCard key={movie._id} props={movie}/>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default MovieList