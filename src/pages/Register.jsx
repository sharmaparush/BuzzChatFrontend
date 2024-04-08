import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/bee.png";
import background from "../assets/background.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    
  });
  const [avatarImage,setAvatarImage]=useState(null)
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {

      const formData = new FormData();
      formData.append("username", values.username)
      formData.append("email", values.email)
      formData.append("password", values.password)
      formData.append("avatarImage", avatarImage)
      console.log(avatarImage)
      const {data}=await axios.post(registerRoute, formData, { headers: {'Content-Type': 'multipart/form-data'}})
      // const { email, username, password,avatarImage } = values;
      // const { data } = await axios.post(registerRoute, {
      //   username,
      //   email,
      //   password,
      //   avatarImage,
      // });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>BuzzChat</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="file"
            placeholder="Select picture"
            name="avatarImage"
            onChange={(e) => {
                setAvatarImage(e.target.files[0]);
            }}
          />
          
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-image: url(${background});
  .brand {
    display: flex;
    align-items: center;
    gap: 0rem;
    justify-content: left;
    img {
      height: 5rem;
    }
    h1 {
      color: black;
      text-transform: uppercase;
    }
    
   
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #FFFFFF;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  
  input {
    background-color: white;
    padding: 1rem;
    border: 0.1rem solid #000000;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #000000;
      outline: none;
    }
  }
  button {
    background-color: #000000;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #000000;
    }
  }
  span {
    color: black;
    text-transform: uppercase;
    a {
      color: #000000;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
