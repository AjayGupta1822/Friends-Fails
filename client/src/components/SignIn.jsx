import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import backIcon from "../assets/back.png";
import { Toaster, toast } from "sonner";
import { setCookie } from "../utils/cookies";
import { AppContext } from "./Context";
import { loginCheck } from "../utils/loginCheck";

function SignIn() {
    const {login,setLogin} = useContext(AppContext)
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const FormSubmitHandler = (data) => {
  try{
    toast.promise(
      axios
      .post("https://backend-cat-fails.vercel.app/users/login", data)
      , {
      loading: "Loading...",
      success: (result) => {
        setCookie("username",data.username,365)
        setCookie("auth-token",result.data,365)
        setLogin(loginCheck())
        setTimeout(()=>{
          navigate('/listings');
        })
        return `Logined!`;
      },
      error: "Error",
    })
      }catch(err){
        toast.error('Some error has occured!')
        console.log(err);
      }
  }

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  return (
    <div className="form-parent">
      <Toaster richColors position="top-right"/>
      <form className="form" onSubmit={handleSubmit(FormSubmitHandler)}>
        <span id="form-head1">Sign In</span>
        <span id="form-head2">Sign in to your account!</span>
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
          <button className="form-btn2" type="submit">
            Sign In
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignIn