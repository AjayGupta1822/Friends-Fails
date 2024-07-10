import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import backIcon from "../assets/back.png";
import { Toaster, toast } from "sonner";
import { AppContext } from "./Context";
import { setCookie } from "../utils/cookies";
import { loginCheck } from "../utils/loginCheck";

function SignUp() {
    const navigate = useNavigate();
    const {login, setLogin} = useContext(AppContext)
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const FormSubmitHandler = (data) => {
  try{
    toast.promise(
      axios.post("https://backend-cat-fails.vercel.app/users", data),
      {
        loading: "Loading...",
        success: (response) => {
          setCookie("username", data.username, 365);
          setCookie("auth-token", response.data, 365);
          setLogin(loginCheck());
          setTimeout(()=>{
            navigate('/listings')
          }, 1500)
          return `Account Created!`;
        },
        error: "Error",
      }
    );    
      }catch(err){
        toast.error('Some error has occured!')
      }
  }

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  return (
    <div className="form-parent">
      <Toaster richColors position="top-right"/>
      <form className="form" onSubmit={handleSubmit(FormSubmitHandler)}>
        <span id="form-head1">Sign Up</span>
        <span id="form-head2">Create an Account!</span>
        <FormControl fontWeight={800}>
          <FormLabel fontWeight={900} fontSize="1.8vmax" as="legend">
            Name
          </FormLabel>
          <Input
            type='text'
            borderColor="black"
            {...register("name", {
              required: "Name is required",
            })}
          />
          <p className="err">{errors.user?.message}</p>
        </FormControl>
        <FormControl fontWeight={800}>
          <FormLabel fontWeight={900} fontSize="1.8vmax" as="legend">
            Username
          </FormLabel>
          <Input
            type='text'
            borderColor="black"
            {...register("username", {
              required: "Username is required",
            })}
          />
          <p className="err">{errors.user?.message}</p>
        </FormControl>
        <FormControl fontWeight={800}>
          <FormLabel fontWeight={900} fontSize="1.8vmax" as="legend">
            Password
          </FormLabel>
          <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            borderColor="black"
            {...register("password", {
                required: "Title is required",
                maxLength: { value: 40, message: "Max 40 Chars" },
            })}
            />
          <InputRightElement  width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
            </InputGroup>
          <p className="err">{errors.title?.message}</p>
        </FormControl>
        <div className="form-btns">
          <Link
            to="/"
            style={{ textDecoration: "None", color: "Black" }}
          >
            <div className="span-div form-btn-back">
              <img src={backIcon} alt="" id="back" />
              &nbsp;
              <span id="form-back">Back</span>
            </div>
          </Link>
          <button className="form-btn2" type="submit">
            Sign Up
          </button>
        </div>
        <span style={{fontWeight:800}}>Already have an account?</span>
        <Link
            to="/signin"
            style={{ textDecoration: "None", color: "Black" }}
          >
        <button className="form-btn2">
            Sign In
          </button>
          </Link>
      </form>
    </div>
  )
}

export default SignUp