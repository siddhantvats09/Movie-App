import * as React from 'react';
import "./header/Header.css"
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  const history = useNavigate();

  useEffect(() => {
    if (value === 0) {
      history("/");
    } else if (value === 1) {
      history("/movies");
    } else if (value === 2) {
      history("/series");
    } else if (value === 3) {
      history("/search");
    }else if (value === 4) {
      history("/developer");
    }
  }, [value, history]);


  return (
    <Box sx={{ width: "100%", position:"fixed" ,bottom:0,zIndex: 100 ,backgroundColor:"#39445a" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction label="Movies" icon={<MovieIcon />} />
        <BottomNavigationAction label="TV series" icon={<SlideshowOutlinedIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchOutlinedIcon />} />
        <BottomNavigationAction label="Developer" icon={<PersonIcon />} />
      </BottomNavigation>
    </Box>
  );
}