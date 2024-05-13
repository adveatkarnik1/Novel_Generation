import { useState } from "react";
import css from "./generatedResponses.module.css";
import GeneratedResponse from "./generatedResponse";

function Generated({generated}) {
  let [numRows, setNumRows] = useState(1);
  // let [bookArr, setBookArr] = useState(generated);
  function expandBooks() {
    setNumRows(numRows + 1);
  }
  return (
    <>
      <div className={`${css.trendingBookQueueDiv}`}>
        {/* <div className={`${css.trendingBookQueue}`}> */}
        {generated
          .slice(0, Math.min(numRows * 4, generated.length))
          .map((element) => {
            return <GeneratedResponse className={``} response={element}></GeneratedResponse>
          }
          )}
        {/* </div> */}
        <div>
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
        </div>
      </div>
    </>
  );
}

export default Generated;
