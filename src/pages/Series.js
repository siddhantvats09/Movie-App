
import React, { useState, useEffect } from 'react'
import axios from "axios";
import useGenre from '../hooks/useGenres';
import Genres from '../components/Genres';
import Cpegination from '../components/prgination/Cpegination';
import Singlecontent from '../components/singlecontent/Singlecontent';

const Series = () => {

  const [page, setpage] = useState(1);
  const [numOfPage, setNumOfPage] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [content, setcontent] = useState([])
  const genraforurl = useGenre(selectedGenres)


  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=8b0299a0c353a66d490a16c07cbea2aa&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genraforurl}`
    );
    setcontent(data.results);
    setNumOfPage(data.total_pages)
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
    // eslint-disable-next-line
  }, [page, genraforurl]);

  return (
    <div>
         <span className='pageTitle'>TV Series</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setpage={setpage}
      />
      <div className="trending">
        {content && content.map((c) => <Singlecontent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name}
          date={c.first_air_date || c.release_date} media_type={"tv"} vote_average={c.vote_average}
        />)}
      </div>
      <Cpegination setpage={setpage} numOfPage={numOfPage} />

    </div>
  )
}

export default Series
