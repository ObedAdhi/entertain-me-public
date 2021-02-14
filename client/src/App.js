import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home, AddPage, EditPage } from './pages'
import { ApolloProvider } from '@apollo/client'
import client from './config/apolloclient'

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path={'/add-movie'}>
            <AddPage />
          </Route>
          <Route path={'/edit-movie'}>
            <EditPage />
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
