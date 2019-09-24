import React, { Component, Fragment } from 'react';
import uuid from 'uuid';
import axios from 'axios';
import '../App.css';

export default class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      selectedItem: '',
      myMovies: [],
      username: '',
      error: false,
      loading: false
    };
  }

  handleClick = e => {
    if (this.state.myMovies.length < 10) {
      this.setState({ selectedItem: e.target.name }, () => {
        const movie = {
          id: uuid(),
          title: this.state.selectedItem
        };
        this.setState({
          myMovies: [...this.state.myMovies, movie]
        });
      });
    }
  };

  handleDelete = movie => {
    const filteredItems = this.state.myMovies.filter(
      item => item.id !== movie.id
    );
    this.setState({
      myMovies: filteredItems
    });
  };

  sendBackend = (movies, username) => {
    this.setState({ loading: true });
    const sliceMovies = movies.slice(0, 10);
    const userId = uuid();
    axios
      .post('https://localhost:5000/add', {
        sliceMovies,
        userId,
        username
      })
      .then(res => {
        console.log(res.data);
        this.setState({ error: false });
        window.location = `/${username.toLocaleLowerCase()}`;
      })
      .catch(err => this.setState({ error: true, loading: false }));
  };

  usernameChange = e => {
    this.setState({ username: e.target.value, error: false });
  };

  render() {
    return (
      <Fragment>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8'>
              {this.props.movies.map((movie, i) => {
                return (
                  <div key={i}>
                    {i < 10 && movie.release_date ? (
                      <span>
                        <div
                          className='btn-group-vertical'
                          role='group'
                          aria-label='Vertical example'
                        >
                          <button
                            className='btn btn-secondary outline mb-2'
                            name={
                              movie.original_title +
                              ' ' +
                              '(' +
                              movie.release_date.substr(0, 4) +
                              ')'
                            }
                            onClick={this.handleClick}
                            key={i}
                            type='button'
                          >
                            {movie.original_title} (
                            {movie.release_date.substr(0, 4)})
                          </button>
                        </div>
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                );
              })}
            </div>

            <div className='justify-content-end col-md-4'>
              <hr className='divider'></hr>
              <div className='container'>
                <div className='row'>
                  {this.state.loading && (
                    <div className='alert alert-dark' role='alert'>
                      Please Wait. Preparing Your List.
                    </div>
                  )}
                </div>
                <div className='row'>
                  {this.state.error && (
                    <div className='alert alert-dark' role='alert'>
                      Username is already taken.
                    </div>
                  )}
                </div>
              </div>
              {this.state.myMovies.length ? (
                <Fragment>
                  <h2 className='text-center' style={{ color: 'white' }}>
                    Your Best Movies
                  </h2>
                </Fragment>
              ) : (
                <Fragment>
                  <h3 className='text-center' style={{ color: 'white' }}>
                    Just Search and Click
                  </h3>
                </Fragment>
              )}

              {this.state.myMovies.map((movie, i) => {
                return (
                  <Fragment key={i}>
                    <div className='row'>
                      <h5
                        style={{ color: 'white', marginLeft: 10 }}
                        onClick={() => this.handleDelete(movie)}
                        key={movie.id}
                      >
                        {i < 10 ? (
                          <span>
                            {i + 1 + '. '}
                            {movie.title}
                            <span className='mx-2 text-danger'>
                              <i
                                onClick={() => this.handleDelete(movie)}
                                className='fa fa-trash'
                              ></i>
                            </span>
                          </span>
                        ) : (
                          ''
                        )}
                      </h5>
                    </div>
                  </Fragment>
                );
              })}

              {this.state.myMovies &&
              this.state.myMovies.length !== 0 &&
              this.state.myMovies.length < 10 ? (
                <button
                  style={{ marginTop: 10 }}
                  disabled
                  className='btn btn-dark'
                >
                  select 10 movies
                </button>
              ) : (
                ''
              )}
              {this.state.myMovies && this.state.myMovies.length >= 10 ? (
                <Fragment>
                  <div className='input-group input-group-sm mb-2'>
                    <div className='input-group-prepend'>
                      <span
                        className='input-group-text success'
                        id='inputGroup-sizing-sm'
                      >
                        Username
                      </span>
                    </div>
                    <input
                      onChange={this.usernameChange}
                      type='text'
                      className='form-control'
                      aria-label='Sizing example input'
                      aria-describedby='inputGroup-sizing-sm'
                    />
                  </div>
                  <button
                    onClick={() =>
                      this.sendBackend(
                        this.state.myMovies,
                        this.state.username.toLocaleLowerCase()
                      )
                    }
                    className='btn btn-dark'
                  >
                    get my best 10 movies
                  </button>
                </Fragment>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
