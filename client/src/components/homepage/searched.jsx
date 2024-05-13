import { Link } from "react-router-dom";
import css from "./searched.module.css";
import { useState, useRef, useEffect } from "react";
import React from "react";

let Searched = ({ searched, setSearched }) => {
  let [isVisible, setIsVisible] = useState(true);
  const componentRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (componentRef.current && !componentRef.current.contains(event.target)) {
        setIsVisible(false); // Set isVisible directly to false when clicked outside
        setSearched(null);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setSearched]); // Make sure to include setSearched in the dependency array

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

//   console.log(searched);

  return (
    <>
      {searched && <button className={`${css.disappearButton}`} onClick={toggleVisibility}></button>}
      {isVisible && (
        <div ref={componentRef} className={`${css.searchContainer}`}>
          {searched.map((element) => (
            <React.Fragment key={element._id}>
              <Link
                className={`${css.bookLink}`}
                target="_blank"
                to={`/book/${element._id}`}
              >
                <div className={`${css.searchResults}`}>
                  <img
                    className={`${css.bookImg}`}
                    src={`data:image/jpeg;base64,${
                      element.coverPhoto.type === "Buffer"
                        ? btoa(
                            new Uint8Array(element.coverPhoto.data).reduce(
                              (data, byte) => data + String.fromCharCode(byte),
                              ""
                            )
                          )
                        : element.coverPhoto
                    }`}
                    alt=""
                  />
                  <span className={`${css.bookTitle}`}>{element.title}</span>
                </div>
              </Link>
              <hr />
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
};

export default Searched;

