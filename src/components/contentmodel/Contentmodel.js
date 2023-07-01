import React,{useState,useEffect} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
import "./Contentmodel.css";
import { YouTube } from "@mui/icons-material";
import { img_500,unavailable,unavailableLandscape, } from "../../Config";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
 
};


export default function Contentmodel({children, media_type, id}) {
  const [open, setOpen] = React.useState(false);
  
  
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=8b0299a0c353a66d490a16c07cbea2aa&language=en-US`
    );

    setContent(data);
    console.log(data.results)
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=8b0299a0c353a66d490a16c07cbea2aa&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
    <div className='media' style={{cursor:"pointer"}} onClick={handleOpen}>{children}</div>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open} className='fade'>
        <Box sx={style}>
          <Typography className='Typography' id="transition-modal-title" variant="h6" component="h2">
          <img 
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
               
                    <h3>{content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )</h3>
                 
                    <Button
                    variant="contained"
                    startIcon={<YouTube />}
                    color="error"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                 
                  
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          <p>{content.overview}</p>
          </Typography>
        </Box>
      </Fade>
    </Modal>
  </div>
    
  );
}


