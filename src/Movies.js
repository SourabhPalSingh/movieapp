import React from 'react';
import { useGlobalcontext } from './context';
import { NavLink } from 'react-router-dom';

const Movies = () => {
  const { movie, isLoading, isError } = useGlobalcontext();

  if (isLoading) {
    return (
      <div className='movie-section-'>
        <div className='loading'>Loading...</div>
      </div>
    );
  }

  if (isError.show) {
    return <p className='errorStyle'>Error: {isError.msg}</p>;
  }

  if (!movie || movie.length === 0) {
    return <p className="notFound">No movies found.</p>;
  }

  return (
    <section className='movie-page'>
      <div className='container grid grid-4-col'>
        {movie.map((curMovie) => {
          const {imdbID, Title, Poster} = curMovie;
          const movieName = Title.substring(0, 15);

          return(
            <NavLink to={`movie/${imdbID}`} key={imdbID}>
              <div className='card'>
                <div className='card-info'>
                  <h2>{movieName.length >= 15 ? `${movieName}...` : movieName}</h2>
                  <img src={Poster} alt="{imdbID}" />
                </div>
              </div>
            </NavLink>
          )
        })}
      </div>
    </section>
  );
};

export default Movies;