import { useState } from "react";
import TrendingBook from "./trendingBook";
import css from "./allBooks.module.css";

function AllBooks({books}) {
    let [numRows,setNumRows]=useState(1);
    let [bookArr, setBookArr] = useState([
    "Screenshot (1).png",
    "Screenshot (2).png",
    "Screenshot (3).png",
    "Screenshot (4).png",
    "Screenshot (5).png",
    "Screenshot (6).png",
    "29660.jpg",
  ]);
  function expandBooks(){
    console.log('clicked expand');
    setNumRows(numRows+1);
  }
  console.log(books);
  return (
    <>
      <div className={`${css.trendingBookQueueDiv}`}>
        <div className={`${css.trendingBookQueue}`}>
          {books.slice(0, Math.min(numRows*4,bookArr.length)).map((element, index) => (
            <TrendingBook imgSrc={"Screenshot (1).png"} element={element}></TrendingBook>
          ))}
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-chevron-double-down"
            viewBox="0 0 16 16"
            style={{cursor:"pointer"}}
            onClick={expandBooks}
          >
            <path
              fill-rule="evenodd"
              d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
            />
            <path
              fill-rule="evenodd"
              d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

export default AllBooks;
