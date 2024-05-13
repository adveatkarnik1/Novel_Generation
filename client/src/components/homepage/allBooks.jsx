import { useState } from "react";
import TrendingBook from "./trendingBook";
import css from "./allBooks.module.css";

function AllBooks({ books }) {
  let [numRows, setNumRows] = useState(1);
  function expandBooks() {
    if(numRows*3>=books.length)setNumRows(1);
    else
    setNumRows(numRows + 1);
  }
  // console.log(books);
  return (
    <>
      <div className={`${css.trendingBookQueueDiv}`}>
        <div className={`${css.trendingBookQueue}`}>
          {books
            .slice(0, Math.min(numRows * 3, books.length))
            .map((element, index) => (
              <TrendingBook
                imgSrc={"Screenshot (1).png"}
                element={element}
              ></TrendingBook>
            ))}
        </div>
        <div>
          {numRows * 3 < books.length ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-chevron-double-down"
              viewBox="0 0 16 16"
              style={{ cursor: "pointer" }}
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
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-chevron-double-up"
              viewBox="0 0 16 16"
              style={{ cursor: "pointer" }}
              onClick={expandBooks}
            >
              <path
                fill-rule="evenodd"
                d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708z"
              />
              <path
                fill-rule="evenodd"
                d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
              />
            </svg>
          )}
        </div>
      </div>
    </>
  );
}

export default AllBooks;
