import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home, MovieList, MovieAdd, MovieDetail, MovieEdit, TVSeriesList, MyFavorite } from './pages'
import { ApolloProvider } from '@apollo/client'
import client from './config/apolloclient'
import Navbar from "./components/Navbar";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Switch>
          <Route path={'/movies/edit/:id'}>
            <MovieEdit />
          </Route>
          <Route path={'/movies/add'}>
            <MovieAdd />
          </Route>
          <Route path={'/movies/:id'}>
            <MovieDetail />
          </Route>
          <Route path={'/movies'}>
            <MovieList />
          </Route>
          <Route path={'/tvseries'}>
            <TVSeriesList />
          </Route>
          <Route path={'/myFavorite'}>
            <MyFavorite />
          </Route>
          <Route path={'/'}>
            <Home />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
