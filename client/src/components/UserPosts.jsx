import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Toaster, toast } from "sonner";
import { BarLoader } from "react-spinners";
import Post from './Post';


function UserPosts() {
    let { user } = useParams();
  const [data, setData] = useState([]);

    const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(`https://backend-cat-fails.vercel.app/listings/user/${user}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        if(err.response.status==404){
            toast.error(`${user} hasn't posted anything yet! Going back to Users!`)
            setTimeout(() => {
                navigate("/users")
            }, 3000);
        }
      });
  }, []);
  return (
    <>
    <div className="flex">

    <span id="heading" style={{ color: "white" }}>
        <span style={{color:"antiquewhite"}}>@{user}'s</span> Posts
  </span>
    </div>
    <div className="listings-grandParent">
        <Toaster richColors position="top-center"/>
      {data.length == 0 ? (
          <BarLoader color="white" />
          ) : (
              <div className="listings-parent">
          {data.map((e, i) => {
              return <Post listing={data[i]} key={i} />;
            })}
        </div>
      )}
    </div>
      </>
  )
}

export default UserPosts