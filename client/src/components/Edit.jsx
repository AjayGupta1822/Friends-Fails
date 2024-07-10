import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import backIcon from "../assets/back.png";
import { Toaster, toast } from "sonner";

function Edit() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const FormSubmitHandler = (formData) => {
    try {
      toast.promise(
        axios.put(`https://backend-cat-fails.vercel.app/listings/${id}`, formData),
        {
          loading: "Editing your data...",
          success: () => {
            return `Post has been Edited`;
          },
          error: "Error has occured!",
        }
      );
      setTimeout(() => {
        navigate(`/listings/details/${id}`);
      }, 1500);
    } catch (err) {
      toast.error("Some error occured!");
      console.log(err);
    }
  };

  useEffect(() => {
    toast.promise(
      axios
        .get(`https://backend-cat-fails.vercel.app/listings/${id}`)
        .then((res) => {
          setData(res.data);
          setValue("user", res.data.user);
          setValue("title", res.data.title);
          setValue("link", res.data.link);
        })
        .catch((err) => {
          console.log(err);
        }),
      {
        loading: "Loading your Data..",
        success: () => {
          return `You can now edit your data!`;
        },
        error: "Error has occured!",
      }
    );
  }, [id, setValue]);

  return (
    <div className="form-parent">
      <Toaster richColors position="top-right" />
      <form className="form" onSubmit={handleSubmit(FormSubmitHandler)}>
        <span id="form-head1">Edit Post</span>
        <span id="form-head2">Edit your post!</span>
        <FormControl fontWeight={800}>
          <FormLabel fontWeight={900} fontSize="1.8vmax" as="legend">
            Username
          </FormLabel>
          <Input
            type="text"
            borderColor="black"
            {...register("user", {
              required: "Username is required",
            })}
          />
          <p className="err">{errors.user?.message}</p>
        </FormControl>
        <FormControl fontWeight={800}>
          <FormLabel fontWeight={900} fontSize="1.8vmax" as="legend">
            Title
          </FormLabel>
          <Input
            type="text"
            borderColor="black"
            {...register("title", {
              required: "Title is required",
              maxLength: { value: 40, message: "Max 40 Chars" },
            })}
          />
          <p className="err">{errors.title?.message}</p>
        </FormControl>
        <FormControl fontWeight={800}>
          <FormLabel fontWeight={900} fontSize="1.8vmax" as="legend">
            Image Link
          </FormLabel>
          <Input
            type="text"
            borderColor="black"
            {...register("link", {
              required: "Provide a valid image url",
            })}
          />
          <p className="err">{errors.link?.message}</p>
        </FormControl>
        <div className="form-btns">
          <Link
            to="/listings"
            style={{ textDecoration: "None", color: "Black" }}
          >
            <div className="span-div form-btn-back">
              <img src={backIcon} alt="" id="back" />
              &nbsp;
              <span id="form-back">Back</span>
            </div>
          </Link>
          <button className="form-btn2" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;