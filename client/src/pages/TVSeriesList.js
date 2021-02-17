import { useQuery } from "@apollo/client"
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ContentCard from '../components/ContentCard'
import { GET_ALL } from "../config/query";



function TVSeriesList () {
  const { data, loading, error, stopPolling, startPolling } = useQuery(GET_ALL)
  const history = useHistory()


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
          <h4 className={'mb-3'}> TV Series List </h4>
          <div className={'row rounded text-center'} style={{overflowX: 'auto', display: 'block', whiteSpace: 'nowrap', backgroundColor: '#d4d4d4'}}>
            {data.tvseries.map(onetvseries => {
              return (
                <div key={onetvseries._id} className={'col-3 m-0 ps-2 pt-5'} style={{display: 'inline-block'}}>
                  <img style={{maxWidth: '250px', width: '250px', borderRadius: '7%'}} src={onetvseries.poster_path} alt=""></img>
                  <h5 className={'pt-3'} key={onetvseries._id}>{onetvseries.title}</h5> 
                  <p className={'pb-3'}>Rating: {onetvseries.popularity}</p>

                </div>
              )
            })}
          </div>
   
        </div>
      </div>
    )
  }
}

export default TVSeriesList