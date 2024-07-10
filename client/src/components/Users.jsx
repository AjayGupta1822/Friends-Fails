import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { FaUser } from "react-icons/fa";

function Users() {
    const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      axios
        .get("https://backend-cat-fails.vercel.app/users")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  }, []);

  const userClick = (username) => {
    navigate(`/posts/${username}`);
  };

  return (
    <>
      <div className="flex" style={{flexDirection:"column"}}>
        <span id="heading-2" className="flex" style={{ color: "white" }}>
        <FaUser />
        &nbsp;
          Users
        </span>
      </div>
      <div className="users-parent flex">
        <center>

        <ul>
        {data.length == 0 ? (
          <BarLoader color="white" />
          ) : (
            <>
            <span id="user-post-info">Click on any of the following users to view their posts!</span>
            <br /><br /><br />
            <div style={{backgroundColor:"white", borderRadius:"20px", padding:"20px"}}>
        {data.map((e, i) => {
            return (
                <li key={i} style={{listStyleType:"none"}}>
            <span id="user-post" onClick={()=>{userClick(e.username)}}>@{e.username}</span>
          </li>
          );
        })}
        </div>
        </>
    )}
        </ul>
        </center>
      </div>
    </>
  );
}

export default Users;
