import { Badge } from '@material-ui/core';
import {img_300, unavailable} from '../../config/config'
import './SingleContent.css';
import ContentModal from '../ContentModal/ContentModal';

const SingleContent = ({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average
}) => {
  return(
    <ContentModal media_type={media_type} id={id}>
      <Badge badgeContent={parseFloat(vote_average.toFixed(1))} color={vote_average>6 ? 'primary':'secondary'}/>
        <img className='poster'  src={poster? `${img_300}/${poster}`: unavailable} alt={title} ></img>
        <b className='title'>{title}</b>
        <span className='subTitle'>
          <p className='mediaType'>{media_type === "tv"?"TV Series":"Movie"}</p>
          <p className='date'>{date}</p>
          </span>
        {/* <span className='subTitle'></span> */}

    </ContentModal>
  )  
}

export default SingleContent;