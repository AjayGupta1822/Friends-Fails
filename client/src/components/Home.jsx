import React from "react";
import "../App.css";
import LinkIcon from "../assets/Link.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home-parent-main">
        <div className="home-parent">
          <div className="home-parent-part">
            <div className="home-part-1">
              <span id="home-span-1">Memory</span>
              <span id="home-span-2"> Mingle</span>
              <span id="home-span-3">
              Celebrating unforgettable moments with friends.
              </span>
            </div>
            <div className="home-part-2">
              <img src={"https://png.pngtree.com/png-vector/20220725/ourmid/pngtree-happy-friends-group-gathering-png-image_6072378.png"} alt="" id="home-cat" />
            </div>
          </div>
          <div className="home-part-3">
            <Link
              to="/listings"
              style={{ textDecoration: "None", color: "Black" }}
            >
              <button className="btn-1">
                Dive In! &nbsp;
              </button>
            </Link>
            <Link to="/faq" style={{ textDecoration: "None", color: "Black" }}>
              <button className="btn-2">
                FAQ &nbsp;
                <img src={LinkIcon} alt="Link" id="link" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;