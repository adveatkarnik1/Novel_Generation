import Button from "react-bootstrap/Button";
import { useState } from "react";
import css from "./loginContainer.module.css";
import LoginHead from "./loginHead";
import InpDiv from "./inpDiv";
import "./signin.css";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";

function LoginContainer({}) {
  let [tab, switchTab] = useState(true);
  let response = null;
  let [userInfo, setUserInfo] = useState();
  const navigate=useNavigate();
  function handleUserInfo(e) {
    let copyUserInfo = { ...userInfo };
    copyUserInfo[e.target.name] = e.target.value;
    setUserInfo(copyUserInfo);
  }
  const login= async (e) => {
     e.preventDefault();
    try {
      response=await fetch("http://localhost:8080/api/login",{
            method: "POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(userInfo),
        }); 

        response=await response.json();
      if (response.userToken) {
        localStorage.setItem("token", response.userToken);
        navigate('/');
      } else {
        alert("Invalid username or password please try again");
      }
    } catch (error) {
      console.log(error);
    }
  }
  function register(e) {
     e.preventDefault();
    try {
      console.log(userInfo);
      response = axios.post("http://localhost:8080/api/login", userInfo);
      switchTab(!tab);
    } catch (error) {}
  }
  function handleTab() {
    switchTab(!tab);
  }
  return (
    <div className="signInDiv">
      <div className={`${css.loginContainer}`}>
        <LoginHead handleTab={handleTab} tab={tab}></LoginHead>
        <form className={`${css.loginForm}`} onSubmit={tab ? login : register}>
          {!tab ? (
            <InpDiv
              tab={tab}
              name={"email"}
              type={"email"}
              handleUserInfo={handleUserInfo}
            ></InpDiv>
          ) : (
            ""
          )}
          <InpDiv
            tab={tab}
            name={"username"}
            type={"text"}
            handleUserInfo={handleUserInfo}
          ></InpDiv>
          <InpDiv
            tab={tab}
            name={"password"}
            type={"password"}
            handleUserInfo={handleUserInfo}
          ></InpDiv>
          <div className={`${css.inpDiv} ${css.subButton}`}>
            <Button
              className={`${css.Button}`}
              type="submit"
              variant="success"
            >{`${tab ? "Login" : "Signin"}`}</Button>{" "}
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginContainer;
