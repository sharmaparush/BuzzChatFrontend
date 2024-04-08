import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/bee.png";
import {dp} from "../utils/APIRoutes";
import axios from "axios";
export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [check, setCheck] = useState(false);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    const url=await axios.post(dp,{params:{avatarImage:data.avatarImage}})
    console.log(contacts);
    setCurrentUserImage(url.data);
  }, []);
useEffect(async()=>{
    contacts.map(async(contact)=>{
        contact.avatarImage=await axios.post(dp,{params:{avatarImage:contact.avatarImage}})
    })
},[contacts])
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
 
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>BuzzChat</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
            
              return (

                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                  
                  {console.log(contact.avatarImage)}
                    <img
                      src={contact.avatarImage.data}
                      alt="avatar1"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            
            <div className="avatar">
              <img
                //src={`data:image/svg+xml;base64,${currentUserImage}`}
               
                src={currentUserImage}
              
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
          {/* {contacts=temp1} */}
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #ffffff;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    border: 5px solid black;
    img {
      height: 2rem;
    }
    h3 {
      color: black;
      text-transform: uppercase;
    }
  }
  
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    border: 5px solid black;
    border-top: none;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
          border-radius:5rem;
        }
      }
      .username {
        h3 {
          color: black;
        }
      }
    }
    .selected {
      background-color: #000000;
      .username{
      h3 {
        color: white;
      }
    }

    }
  }

  .current-user {
    background-color: #000000;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
