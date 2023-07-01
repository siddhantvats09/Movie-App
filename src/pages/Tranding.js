import React, { useEffect, useState } from 'react'
import axios from "axios"
import Singlecontent from '../components/singlecontent/Singlecontent';
import "./Tranding.css"
import Cpegination from '../components/prgination/Cpegination';




const Tranding = () => {

  const [content, setcontent] = useState([])
  const [page, setpage] = useState(1)


  const fetchtranding = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=8b0299a0c353a66d490a16c07cbea2aa&page=${page}`
    );
    console.log(data)
    setcontent(data.results)
  };

  useEffect(() => {
    fetchtranding()
  }, [page])
  return (
    <div>
      <span className='pageTitle'> Trending </span>
      <div className="trending">
        {content && content.map((c) => <Singlecontent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name}
          date={c.first_air_date || c.release_date} media_type={c.media_type} vote_average={c.vote_average}
        />)}
      </div>
      <Cpegination setpage={setpage} />
    </div>
  )
}

export default Tranding
