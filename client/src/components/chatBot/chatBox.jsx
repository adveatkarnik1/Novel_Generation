import { useState,useEffect } from "react";
import css from "./chatBox.module.css";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../../store/context";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import LoadSpinner from "./spinner";

function ChatBox({handleChatBox}){
  const {_id,getUser,updateUserState}=useUserContext();
  let {generated,favourites}=useUserContext();

  useEffect(()=>{
    getUser();
  },[]);

  let location=useLocation();
  let [chats,setChats]=useState([]);
  let [currChat,setCurrChat]=useState({query:"",result:""});
  let [questionType,setQuestionType]=useState(0);
  let [loading,setLoading]=useState(false);
  function handleChatInput(event){
    let chat={};
    chat.query=event.target.value;
    chat.result="hello";
    setCurrChat(chat)
  }
  function selectGen(option){
    if(option=="story"){
      setQuestionType(1);
    }
    else{
      setQuestionType(0);
    }
  }
  const postChat= async (event)=>{
    event.preventDefault();
    // console.log('inside submit')
    if(location.pathname=='/generator')setQuestionType(1);
    setLoading(true);
    if(!currChat.query)return;
    
    const response=await axios.post("http://127.0.0.1:5000/api",{
      headers:{
        "Content-Type":"application/json",
      },
      body:{
        questionType:questionType,
        question:currChat.query
      }
    });
    setCurrChat({query: "", result: ""});
    const data=await response.data;
    let result="", query="" ;
    result=await data.result;
    query=await data.query;

    let updatedGenerated=[{query:query,result:result},...generated]
    // console.log("frontend",generated);
    setLoading(false);

    const updateStatus=await axios.post("https://novel-generation-server-0bu2.onrender.com/api/updateUser",{
      headers:{
        "Content-Type":"application/json",
      },
      body:{
        _id,
        generated:updatedGenerated,
        favourites,
      }
    });

    if(updateStatus.status!=200){
      alert(updateStatus.data.msg);
      return;
    }

    if(query!=="" && result!==""){
      updateUserState({
      type:"generated",
      payload:updatedGenerated
    });
    }
    setChats(updatedGenerated);
  }
    return (
      <>
        <div
          id="chatBox"
          className={`${css.chatBoxDiv} ${
            location.pathname == "/generator" && css.genPage
          }`}
        >
          <div className={`${css.closeButtonDiv}`}>
            <p className={`${css.botTitle}`}>Aakhyata</p> 
            {/* आख्याता */}
            {!(location.pathname == "/generator") && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
                onClick={handleChatBox}
                cursor={"pointer"}
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            )}
          </div>
          <div className={`${css.chatsDiv}`}>
            {chats.map((element) => {
              return (
                <div className={`${css.chatDiv}`}>
                  {
                    <div className={`${css.userMsgDiv}`}>
                      <p className={`${css.msg}`}>{element.query}</p>
                    </div>
                  }
                  {
                    <div className={`${css.botMsgDiv}`}>
                      <p className={`${css.msg} ${css.botMsg}`}>
                        {element.result}
                      </p>
                    </div>
                  }
                </div>
              );
            })}
          </div>
          {location.pathname=='generator' && <div className={`${css.generateOptions}`}>
            <Button
              onClick={() => selectGen("story")}
              className={`${css.generatebuttons} ${
                questionType == 1 && css.onClickColour
              }`}
              variant="outline-secondary"
            >
              Generate a story
            </Button>{" "}
            <Button
              onClick={() => selectGen("query")}
              className={`${css.generatebuttons} ${
                questionType == 0 && css.onClickColour
              }`}
              variant="outline-secondary"
            >
              Ask a query
            </Button>{" "}
          </div>}
          <form onSubmit={postChat} className={`${css.chatForm}`}>
            <input
              className={`${css.chatInput}`}
              type="text"
              name="chatBotQuery"
              id="#chQuery"
              onChange={handleChatInput}
              placeholder="Ask something!!"
              value={currChat.query}
            />
            <button
              type="submit"
              className={`${
                !loading ? css.chatPostButton : css.chatPostButton2}`}
            >
              {!loading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="white"
                  className={`bi bi-send ${
                    location.pathname == "/generator" && css.submitButton
                  }`}
                  viewBox="0 0 16 16"
                >
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                </svg>
              ) : (
                <LoadSpinner></LoadSpinner>
              )}
            </button>
          </form>
        </div>
      </>
    );
}

export default ChatBox;
