import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Add_Movie, GET_ALL, get_movie, Update_Movie} from "../config/query";



function FormAddEdit() {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [overview, setOverview] = useState('')
  const [poster_path, setPoster_path] = useState('')
  const [inputpopularity, setPopularity] = useState('')
  const [inputtags, setTags] = useState('')
  const history = useHistory()

  const [addMovie, { data:add }] = useMutation(Add_Movie, {
    refetchQueries: [
      { query: GET_ALL }
    ]
  })

  const [updateMovie, { data:update }] = useMutation(Update_Movie, {
    refetchQueries: [
      { query: GET_ALL }
    ]
  })
  
  const { data:Movie, loading, error } = useQuery(get_movie, {
    variables: {
      id
    }
  })


  if (!id) {
    function handleAddMovie() {
      const popularity = +inputpopularity
      const tags = inputtags //[...inputtags, inputtags.split(', ')]
      const data = {
        title, overview, popularity, tags, poster_path
      }
      addMovie({
        variables: {
          newMovie: data
        }
      })
      setTimeout(function(){ history.push('/') }, 700);
      
    }

    return (
      <div className={'container card p-3 mt-5'} style={{ width: '400px' }}>
        <h4 className={'mb-4 pt-2'}>Add New Movie:</h4>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="floatingInput" onChange={(e) => setTitle(e.target.value)} value={title || ""} />
          <label>Title</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="floatingInput1" onChange={(e) => setOverview(e.target.value)} value={overview || ""} />
          <label>Overview</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="floatingInput2" onChange={(e) => setPoster_path(e.target.value)} value={poster_path || ""} />
          <label>Poster Path</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="floatingInput3" onChange={(e) => setPopularity(e.target.value)} value={inputpopularity || ""} />
          <label>Popularity</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="floatingInput4" onChange={(e) => setTags(e.target.value)} value={inputtags || ""} />
          <label>Tags</label>
        </div>
        <button onClick={() => handleAddMovie()} className={'btn btn-primary'}>Submit</button>
      </div>
    )

  } else {
    if (loading) {
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
      // setTitle(Movie.movie.title)
      // setOverview(Movie.movie.overview)
      // setPoster_path(Movie.movie.poster_path)
      // setPopularity(Movie.movie.popularity)
      // setTags(Movie.movie.tags)

  
      function handleEditMovie() {
        const popularity = +inputpopularity
        const tags = inputtags //[...inputtags, inputtags.split(', ')]
        const data = {
          title, overview, popularity, tags, poster_path
        }
        updateMovie({
          variables: {
            id,
            newMovie: data
          }
        })
        history.push('/')
      }
  
      return (
        <div className={'container card p-3 mt-5'} style={{ width: '400px' }}>
          <h4 className={'mb-4 pt-2'}>Add New Movie:</h4>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingInput" onChange={(e) => setTitle(e.target.value)} value={title} />
            <label>Title</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingInput1" onChange={(e) => setOverview(e.target.value)} value={overview} />
            <label>Overview</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingInput2" onChange={(e) => setPoster_path(e.target.value)} value={poster_path} />
            <label>Poster Path</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingInput3" onChange={(e) => setPopularity(e.target.value)} value={inputpopularity} />
            <label>Popularity</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingInput4" onChange={(e) => setTags(e.target.value)} value={inputtags} />
            <label>Tags</label>
          </div>
          <button onClick={() => handleEditMovie()} className={'btn btn-primary'}>Submit</button>
        </div>
      )
    }
    
  }
}

export default FormAddEdit