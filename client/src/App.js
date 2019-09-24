import React, { Component } from 'react';
import SearchArea from './components/SearchArea';
import MovieList from './components/MovieList';
import UserPage from './components/userPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    const API_KEY = 'XXX';
    this.state = {
      movies: [],
      searchTerm: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchTerm) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${this.state.searchTerm}&page=1`
      )
        .then(data => data.json())
        .then(data => {
          console.log(data);
          this.setState({
            movies: [...data.results]
          });
        });
    }
  };

  handleChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    return (
      <div>
        <Router>
          <Route
            exact
            path='/'
            render={props => (
              <SearchArea
                {...props}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                value={this.state.searchTerm}
              />
            )}
          />
          <Route
            exact
            path='/'
            render={props => (
              <MovieList
                {...props}
                movies={this.state.movies}
                searchValue={this.state.searchTerm}
              />
            )}
          />
          <Route exact path='/:userId' component={UserPage} />
        </Router>
      </div>
    );
  }
}
export default App;
