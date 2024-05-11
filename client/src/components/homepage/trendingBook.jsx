import Button from "react-bootstrap/Button";
import css from "./trendingBook.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


function TrendingBook({element}) {
  // console.log('element 1',element);
  let [expDesc,setExpDesc]=useState(false);
  let [expName, setExpName] = useState(false);
  // console.log('type',element.coverPhoto.type)
  return (
    <>
      <Link target="_blank" to={`/book/${element._id}`}  className={css.bookLink}>
        <div className={`${css.trendingBook}`}>
          <img className={`${css.trendingBookBookImg}`} src={`data:image/jpeg;base64,${element.coverPhoto.type=='Buffer'?btoa(
                    new Uint8Array(element.coverPhoto.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                ):element.coverPhoto}`} alt="" />
          <div className={`${css.trendingBookBody}`}>
            <h4
              onMouseEnter={() => setExpName(!expName)}
              onMouseLeave={() => setExpName(!expName)}
              className={`${css.bookName}`}
            >
              {element.title}
            </h4>
            {expName && (
              <h4
                // onMouseLeave={() => setExpName(!expName)}
                className={`${css.bookNameExp}`}
              >
                {element.title}
              </h4>
            )}
            <p
              onMouseEnter={() => setExpDesc(!expDesc)}
              onMouseLeave={() => setExpDesc(!expDesc)}
              className={`${css.bookDescription}`}
            >
              {element.description}
            </p>
            {expDesc && (
              <p
                className={`${css.bookDescriptionExp}`}
                // onMouseLeave={() => setExpDesc(!expDesc)}
              >{element.description}</p>
            )}
            <Button variant="primary">Open</Button>
          </div>
        </div>
      </Link>
    </>
  );
}

export default TrendingBook;
