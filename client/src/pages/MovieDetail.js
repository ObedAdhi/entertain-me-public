import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { get_movie } from "../config/query";


function DetailPage () {
  const { id } = useParams()
  const { data, loading, error } = useQuery(get_movie, {
    variables: {
      id
    }
  })

  if (error) {
    return (
      <div> error error </div>
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
      <div className={'container card mt-5'}>
        <div className={"row"}>

          <div className={"col-3 text-center mt-5"}>
            <img style={{maxWidth: '250px', width: '250px'}} src={data.movie.poster_path} alt=""></img>
            <p className={'mt-3'}><span style={{fontSize: '15px'}} className="material-icons m-0 pt-1">star_rate</span>Rating: {data.movie.popularity}</p>
          </div>

          <div className={"col-9 mt-5"}>
            <h3 className={'pt-3 card-title'}>{data.movie.title}</h3> <br></br>
            <h6>Overview</h6>
            <p className={'card-body'}>{data.movie.overview}</p>
            <h6>Genre</h6>
            <p className={'card-body'}>{(data.movie.tags).join(', ')}</p>
          </div>

        </div>
      </div>
    )
  }
}

export default DetailPage