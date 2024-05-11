import css from "./book.module.css";
import Button from "react-bootstrap/Button";
import Card from "./flipCard";
import { useUserContext } from "../../store/context";
import { useEffect, useState } from "react";
import LoginMessege from "./loginMessege";
import Footer from "../../footer";
import axios from "axios";
import { useLocation } from "react-router-dom";
import PDFViewer from "../../pdfViewer";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Loading from "../../loading";

function Book({ appearChat }) {
  let { loginStatus, getUser, updateUserState, generated, favourites, _id } =
    useUserContext();
  let [Close, setClose] = useState(true);
  let [stars,setStars]=useState([false,false,false,false,false]);
  let [readMode, setReadMode] = useState(true);

  let toggleSignForFetchingBook = 0;
  useEffect(() => {
    getUser();
    toggleSignForFetchingBook ^= 1;
  }, []);

  let book_id = useLocation().pathname.slice(6);
  const [book, setBook] = useState(null);

  const fetchBook = async () => {
    const response = await axios.post(
      "http://localhost:8080/api/getBookData?_id=" + book_id,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          reqFields: ["*"],
        },
      }
    );
    const data = await response.data;
    setBook(await data);
    // console.log(data);
  };

  useEffect(() => {
    fetchBook();
  }, [toggleSignForFetchingBook]);

  function handleClose() {
    setClose(!Close);
  }
  const  rate=async (num) => {
    let copy=[];
    for(let i=0;i<5;++i){
      copy.push(i<num?true:false);
    }
    setStars(copy);
    const response=await axios.post("http://localhost:8080/api/updateBookRating",{
      headers:{
        "Content-Type":"application/json",
      },
      body:{
        book_id,
        user_id:_id,
        rating:num
      }
    });

    const data=await response.data;
    console.log(await data.msg);
  }
  const handleBookOper = async (oper) => {
    if (!loginStatus) {
      handleClose();
    } else if (oper == "read") {
      setReadMode(false);
    } else if (oper == "favourites") {
      let newFavourites = [...favourites, { _id: book._id }];
      const updateStatus = await axios.post(
        "http://localhost:8080/api/updateUser",
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            _id,
            generated,
            favourites: newFavourites,
          },
        }
      );

      if (updateStatus.status != 200) {
        alert(updateStatus.data.msg);
        return;
      }

      updateUserState({
        type: "favourites",
        payload: newFavourites,
      });
      // console.log('inside book',favourites);
    }
  };
  return (
    <>
      {book ? (
        <>
          <div
            className={`${css.bookAndCards} ${appearChat && css.appearChat} ${
              !readMode && css.readMode
            }`}
          >
            {readMode ? (
              <>
                {!Close && (
                  <LoginMessege handleClose={handleClose}></LoginMessege>
                )}
                <div className={`${css.bookDiv}`}>
                  <div className={`${css.bookImgDiv}`}>
                    <img
                      src={`data:image/jpeg;base64,${btoa(
                        new Uint8Array(book.coverPhoto.data).reduce(
                          (data, byte) => data + String.fromCharCode(byte),
                          ""
                        )
                      )}`}
                      alt="book Img"
                      className={`${css.bookImg}`}
                    />
                  </div>
                  <div className={`${css.bookInfo}`}>
                    <h3>{book.title}</h3>
                    <p>Author: {book.author}</p>
                    <p>
                      Rating:{book.rating}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#c29920"
                        class="bi bi-star-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>{" "}
                    </p>
                    <p className={`${css.bookDescription}`}>
                      {book.description}
                    </p>
                    <div className={`${css.buttonDiv}`}>
                      <Button
                        onClick={() => handleBookOper("read")}
                        className={`${css.readButton}`}
                        variant="primary"
                      >
                        Read
                      </Button>
                      <Button
                        onClick={() => handleBookOper("favourites")}
                        className={`${css.favouritesButton}`}
                        variant="danger"
                      >
                        Add to Favourites
                      </Button>{" "}
                      {/* <Button
                onClick={() => handleBookOper("rate")}
                className={`${css.readButton}`}
                variant="success"
              >
                Rate it
              </Button> */}
                      <Dropdown
                        onClick={() => handleBookOper("rate")}
                        className={`${css.readButton}`}
                      >
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Rate it
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <div style={{cursor:'pointer',display:"flex",flexDirection:'row',justifyContent:'center'}}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill={stars[0]?"#c29920":"black"}
                              class="bi bi-star-fill"
                              viewBox="0 0 16 16"
                              id="1"
                              // onMouseEnter={()=>rate(1,'hover')}
                              // onMouseLeave={()=>setStars([false,false,false,false,false])}
                              onClick={()=>rate(1,'rate')}
                            >
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill={stars[1]?"#c29920":"black"}
                              class="bi bi-star-fill"
                              viewBox="0 0 16 16"
                              id="2"
                              // onMouseEnter={()=>rate(2,'hover')}
                              // onMouseLeave={()=>setStars([false,false,false,false,false])}
                              onClick={()=>rate(2,'rate')}
                            >
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill={stars[2]?"#c29920":"black"}
                              class="bi bi-star-fill"
                              viewBox="0 0 16 16"
                              id="3"
                              // onMouseEnter={()=>rate(3,'hover')}
                              // onMouseLeave={()=>setStars([false,false,false,false,false])}
                              onClick={()=>rate(3,'rate')}
                            >
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill={stars[3]?"#c29920":"black"}
                              class="bi bi-star-fill"
                              viewBox="0 0 16 16"
                              id="4"
                              // onMouseEnter={()=>rate(4,'hover')}
                              // onMouseLeave={()=>setStars([false,false,false,false,false])}
                              onClick={()=>rate(4,'rate')}
                            >
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill={stars[4]?"#c29920":"black"}
                              class="bi bi-star-fill"
                              viewBox="0 0 16 16"
                              id="5"
                              // onMouseOver={()=>rate(5,'hover')}
                              // onMouseLeave={()=>setStars([false,false,false,false,false])}
                              onClick={()=>rate(5,'rate')}
                            >
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>{" "}
                            </div>
                          {/* </Dropdown.Item> */}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className={`${css.cardRow}`}>
                  <Card
                    name={book.mainCharacters[0].name}
                    desc={book.mainCharacters[0].description}
                  ></Card>
                  <Card
                    name={book.mainCharacters[1].name}
                    desc={book.mainCharacters[1].description}
                  ></Card>
                  <Card
                    name={book.mainCharacters[2].name}
                    desc={book.mainCharacters[2].description}
                  ></Card>
                </div>
                <Footer></Footer>
              </>
            ) : (
              <PDFViewer base64Data={book.pdfData}></PDFViewer>
            )}
          </div>
        </>
      ):<Loading className={``}></Loading>}
    </>
  );
}

export default Book;
