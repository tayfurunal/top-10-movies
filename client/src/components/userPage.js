import React, { Component } from 'react';
import '../App.css';

export default class userPage extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    };
  }

  getBack = () => {
    return fetch('https://localhost:8080/' + this.props.match.params.userId)
      .then(res => res.json())
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getBack().then(data => {
      console.log(data.movies);
      data.movies.map(movie => {
        var joined = this.state.movies.concat(movie.title);
        this.setState({
          movies: joined
        });
      });
    });
  }
  render() {
    return (
      <div className='container-list'>
        <div className='row'>
          <div className='list'>
            {this.state.movies &&
              this.state.movies.map((movie, i) => {
                return (
                  <div key={i}>
                    <h5 style={{ color: 'white' }}>
                      <span>
                        {i + 1 + ' - '}
                        {movie}
                      </span>
                    </h5>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}
