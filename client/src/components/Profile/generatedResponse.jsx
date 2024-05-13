import css from "./generatedResponse.module.css";
import { useState } from "react";
function GeneratedResponse({response}) {
//  console.log('response',response);
  let [len,setLen]=useState(545);
  function increaseLen(event,resp){
    event.preventDefault();
    if(len<resp.length){
        setLen(Math.min(len+545,resp.length));
    }
    else{
        setLen(545);
    }
  }
  return (
    <>
      <div className={`${css.generatedResponse}`}>
        {/* {response.slice(0,len)} */}
        <div className={`${css.chatDiv}`}>
                  {<div className={`${css.userMsgDiv}`}>
                    <p className={`${css.msg}`}>{response.query.slice(0,len)}<a href="" className={`${css.readToggle}`} onClick={(e)=>increaseLen(e,response.query)}>{
                      len<response.query.length?"...Read more":response.query.length<545?"":"Read less..."
                      }</a></p>
                  </div>}
                  {<div className={`${css.botMsgDiv}`}>
                    <p className={`${css.msg} ${css.botMsg}`}>
                      {response.result.slice(0,len)}<a className={`${css.readToggle}`} href="" onClick={(e)=>increaseLen(e,response.result)}>{len<response.result.length?"...Read more":response.result.length<545?"":"Read less..."}</a>
                    </p>
                  </div>}
                </div>
        {/* <a href="" onClick={increaseLen}>{len<response.length?"...Read more":"Read less..."}</a> */}
      </div>
    </>
  );
}

export default GeneratedResponse;
