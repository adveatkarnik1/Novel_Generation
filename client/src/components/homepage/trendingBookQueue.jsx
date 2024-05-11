import css from "./trendingBookQueue.module.css";
import TrendingBook from "./trendingBook";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../../store/context";

function TrendingBookQueue(props) {
  let [bookArr,setBookArr] =useState( props.books);
  // console.log(bookArr,"this is book arr");
  function slideLeft(){
    let copyArr=[...bookArr];
    let firstEle=copyArr.shift();
    copyArr.push(firstEle);
   setBookArr(copyArr)
  }
  function slideRight() {
    let copyArr = [...bookArr];
    let firstEle = copyArr.pop();
    copyArr.unshift(firstEle);
    setBookArr(copyArr)
   }

  return (
    <>
      <div className={`${css.trendingBookQueueDiv}`}>
       {bookArr.length>4 &&  <div className={`${css.arrowDiv}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-arrow-left-circle"
            viewBox="0 0 16 16"
            style={{ cursor: "pointer" }}
            onClick={slideLeft}
          >
            <path
              fill-rule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
            />
          </svg>
        </div>}
        <div className={`${css.trendingBookQueue}`}>
          {
            bookArr && bookArr.slice(0,Math.min(4,bookArr.length)).map((element,index)=><TrendingBook element={element}></TrendingBook>)
          }
        </div>
        {bookArr.length >4 && <div className={`${css.arrowDiv}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className={`bi bi-arrow-right-circle`}
            viewBox="0 0 16 16"
            style={{ cursor: "pointer" }}
            onClick={slideRight}
          >
            <path
              fill-rule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
            />
          </svg>
        </div>}
      </div>
    </>
  );
}
export default TrendingBookQueue;
