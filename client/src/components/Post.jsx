import React, { useState } from "react";
import heart_1 from "../assets/heart-1.svg";
import heart_2 from "../assets/heart-2.svg";
import heart_3 from "../assets/heart-3.svg";
import comment_1 from "../assets/comment-1.svg";
import { useNavigate } from "react-router-dom";

function Post({listing}) {
  const navigate = useNavigate();
  const [heartIcon, setHeartIcon] = useState(heart_2);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (!clicked) {
      setHeartIcon(heart_1);
    } else {
      setHeartIcon(heart_2);
    }
    setClicked(!clicked);
  };

  const handleMouseEnter = () => {
    if (!clicked) {
      setHeartIcon(heart_3);
    }
  };

  const handleMouseLeave = () => {
    if (!clicked) {
      setHeartIcon(heart_2);
    }
  };

  const cardClick = () => {
    navigate(`/listings/details/${listing._id}`);
  };

  return (
    <div className="post-parent">
      <div className="post-main">
        <div className="post-pt">
          <img src={listing.link} alt="Moment GIF" id="moment" draggable="false" onClick={cardClick}/>
          <div className="info flex">
            <span id="user"><i>@{listing.user}</i></span>
            <span id="time">{listing.datePosted}</span>
          </div>
          <div className="title">{listing.title.length>35 ? listing.title.substr(0, 35) + "..." : listing.title}</div>
          <div className="data flex">
            <div className="data-likes">
              <img
                id="hearticon"
                src={heartIcon}
                alt="Heart Icon"
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                draggable="false"
              />
              <span id="likes">{listing.like}</span>
            </div>
            <div className="data-comments">
              <img src={comment_1} alt="" id="commenticon" />
              <span id="comments">{listing.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;

