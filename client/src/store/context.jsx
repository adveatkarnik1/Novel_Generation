import axios from "axios";
import { useEffect, useState } from "react";
import { createContext, useReducer } from "react";
import UserReducer from "./userReducer";
import { useContext } from "react";

const UserContext = createContext();

const guest = {
  _id: "",
  username: "",
  email:"",
  photo:"",
  loginStatus: false,
  loading:false,
  isAdmin:false,
  generated: [],
  favourites:[],
};


const UserProvider = ({ children }) => {
  const [userState, updateUserState] = useReducer(UserReducer, guest);
  const getUser=async ()=>{
    try {
      let token=localStorage.getItem('token');
      console.log(token);
      if(token){
        token="Bearer "+token;
        const response = await axios.get("http://localhost:8080/api/getUserData", {
          headers: {
            Authorization: token,
          },
        });
        if (response.status === 200) {
          const userData=response.data.userData;
          console.log("userData",userData);
          updateUserState({
            type: "loginStatus",
            payload: true,
          });
          updateUserState({
            type: "_id",
            payload: userData._id,
          });
          updateUserState({
            type: "username",
            payload: userData.username,
          });
          updateUserState({
            type: "email",
            payload: userData.email,
          });
          updateUserState({
            type: "photo",
            payload: userData.photo,
          });
          updateUserState({
            type: "isAdmin",
            payload: userData.isAdmin,
          });
          updateUserState({
            type: "generated",
            payload: userData.generated,
          });
          updateUserState({
            type: "favourites",
            payload: userData.favourites,
          });
        }
        console.log('userstate',userState);
      }
    } catch (error) {
      console.log(error);
    }
  }




  

  return (
    <UserContext.Provider value={{ ...userState,userState, updateUserState, getUser}}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, UserContext, useUserContext };
