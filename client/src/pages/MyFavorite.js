import { useQuery } from "@apollo/client"
import { useHistory } from "react-router-dom";
import ContentCard from '../components/ContentCard'
import { Get_Collection_Movie } from "../config/query";



function MyFavorite () {
  const { data, loading, error } = useQuery(Get_Collection_Movie)
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
          
          <h4 className={'mb-3'}> Favorite List </h4>

          <div className={'row rounded text-center'} style={{overflowX: 'auto', display: 'block', whiteSpace: 'nowrap', backgroundColor: '#d4d4d4'}}>
            {data.collectionMovie.map(movie => {
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

export default MyFavorite