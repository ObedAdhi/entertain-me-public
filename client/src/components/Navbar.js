import React from 'react'
import {
  Link
} from 'react-router-dom'

class Navbar extends React.Component {
  render() {
    return (
      <nav className={"navbar navbar-expand-lg navbar-dark ps-5"} style={{backgroundColor: "black"}}>
        <div className={"container-fluid"}>
          <h4 className={"navbar-brand m-0"} >ENTERTAIN ME</h4>
          <div className={'text-start me-2'}>
            <Link to="/">
              <button className={'btn text-light'}>Home</button>
            </Link>
       
            <Link to="/movies">
              <button className={'btn text-light'}>Movie List</button>
            </Link>
            <Link to="/tvseries" >
              <button className={'btn text-light'}>TV Series List</button>
            </Link>

            <Link to="/myFavorite" >
              <button className={'btn text-light'}>My Favorite</button>
            </Link>  
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
