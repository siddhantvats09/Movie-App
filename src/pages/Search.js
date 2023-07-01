import React,{useState,useEffect} from 'react'
import "./Search.css"
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { Button, Tab, Tabs, TextField } from '@mui/material'
import axios from 'axios';
import Singlecontent from '../components/singlecontent/Singlecontent';
import Cpegination from '../components/prgination/Cpegination';

const Search = () => {
  const [type, settype] = useState(0)
  const [page, setpage] = useState(1)
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPage, setNumOfPage] = useState();
  // eslint-disable-next-line



  const fetchSearch = async () => {
    
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=8b0299a0c353a66d490a16c07cbea2aa&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPage(data.total_pages);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);
  return (
    <div>
            <span className='pageTitle'></span>
           <div className='search'>
           <TextField color="primary" style={{flex:1}} className="searchBox" id="outlined-basic" label="search" variant="outlined"
            focused placeholder='Search Here....'
              onChange={(e)=>setSearchText(e.target.value)}
            />
            <Button variant="contained"
            onClick={fetchSearch}
            style={{ marginLeft: 10 }}
            >
                <SearchSharpIcon/>
            </Button>
           </div>
          <Tabs 
          value={type}
          indicatorColor="primary"
          textColor="warning"
          style={{ paddingBottom: 5 }}
          className='maintab'
          onChange={(event, newValue) => {
            settype(newValue);
            setpage(1);
          }}
          
          >
           <Tab className='tabs' style={{ width: "50%" }} label="Search Movies" />
          <Tab className='tabs' style={{ width: "50%" }} label="Search TV Series" />
          </Tabs>
          <div className="trending">
        {content && content.map((c)=>  <Singlecontent   key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} 
          date={c.first_air_date || c.release_date}  media_type={type ? "tv" : "movie"} vote_average={c.vote_average}
        /> )}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
       {numOfPage > 1 && (
       <Cpegination setpage={setpage}  numOfPage={numOfPage} />
      )}
    </div>
  )
}

export default Search
