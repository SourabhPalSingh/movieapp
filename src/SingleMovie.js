import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const SingleMovie = () => {
  const { id } = useParams(); // Get the imdbID from URL
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch movie details from OMDB API when the component mounts or `id` changes
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${process.env.REACT_APP_API_KEY}`);

        // https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}

        // Log the response for debugging
        console.log('Response:', response);

        // Check if the response is OK (status code 200)
        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }

        const data = await response.json();

        // Log the data for debugging
        console.log('Data:', data);

        // Check if the response contains valid movie data
        if (data.Response === 'True') {
          setMovieData(data);
        } else {
          throw new Error('Movie not found');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setError(error.message); // Set error message in case of an error
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]); // Dependency array includes `id`, so it refetches when `id` changes

  if (loading) {
    return (
      <section className="movie-section ">
        <div className="loading">Loading....</div>;
      </section>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!movieData) {
    return <div>No movie data found</div>;
  }

  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={movieData.Poster} alt="" />
        </figure>
        <div className="card-content">
          <p className="title">{movieData.Title}</p>
          <p className=""></p>
          <p className="card-text">{movieData.Released}</p>
          <p className="card-text">{movieData.Genre}</p>
          <p className="card-text">{movieData.imdbRating} / 10</p>
          <p className="card-text">{movieData.Country}</p>
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>
      </div>
    </section>

    // <div className="movie-details">
    //   <h1>{movieData.Title}</h1>
    //   <p>{movieData.Plot}</p>
    //   <img src={movieData.Poster} alt={movieData.Title} />
    //   <p>Released: {movieData.Released}</p>
    //   <p>IMDB Rating: {movieData.imdbRating}</p>
    //   <p>Genre: {movieData.Genre}</p>
    //   {/* Add more movie details as needed */}
    // </div>
  );
};

export default SingleMovie;