import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import { img_500,unavailable,unavailableLandscape } from "../../config/config";
import { Button } from "@mui/material";
import { YouTube } from "@material-ui/icons";
import './ContentModal.css'
import Carousel from './Carousel/Carousel'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

export default function ContentModal({ children, media_type, id }) {
  const classes = useStyles()
  const [open,setOpen] = React.useState(false)
  const [content,setContent] = useState()
  const [video,setVideo] = useState()


  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () =>{
    setOpen(false)
  }

  const fetchData = async() => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    setContent(data)
  }

  useEffect(()=>{
    fetchData();
    fetchVideo()
  },[])

  const fetchVideo = async() => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    console.log(data)
    setVideo(data.results[0]?.key)
  }


  return (
    <>
      <div
        className="media"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
       
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div className="ContentModal">
                <img 
                    alt={content.name || content.title} 
                    className="ContentModal_portrait" 
                    src={content.poster_path?`${img_500}/${content.poster_path}`:unavailable}>
                </img>
                <img 
                    alt={content.name || content.title} 
                    className="ContentModal_landscape" 
                    src={content.backdrop_path?`${img_500}/${content.backdrop_path}`:unavailableLandscape}>
                </img>
                <div className="ContentModal_about">
                    <span className="ContentModal__title">
                        {content.name || content.title} (
                            {(
                                content.first_air_date ||
                                content.release_date ||
                                "--------"
                            ).substring(0,4)}
                        )
                    </span>
                    {content.tagline && (
                        <i className="tagline">{content.tagline}</i>
                    )}
                    <span className="contentModal_description">
                        {content.overview}
                    </span>
                    <div>
                      <Carousel media_type={media_type} id={id}/>
                    </div>
                    <Button
                        variant="contained"
                        startIcon = {<YouTube/>}
                        color = "secondary"
                        target = "_blank"
                        href={`https://www.youtube.com/watch?v=${video}`}
                    >
                        Watch the Trailer
                    </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
      <IconButton
        edge="end"
        color="inherit"
        className={classes.closeButton}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
    </>
  );
}