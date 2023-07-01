
import React from 'react'
import { img_300, unavailable } from '../../Config'
import "./Singlecontent.css"
import { Badge } from '@mui/material'
import Contentmodel from '../contentmodel/Contentmodel'

const Singlecontent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <Contentmodel media_type={media_type} id={id}>
      <Badge badgeContent={vote_average} color={vote_average > 6 ? 'primary' : 'secondary'} />
      <img className="poster"
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title} />
      <b className="title">{title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>

    </Contentmodel>
  )
}

export default Singlecontent
