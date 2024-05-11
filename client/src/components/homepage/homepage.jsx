
import css from "./homepage.module.css";
import { useState } from "react";
import Carousels from "./carousals";
import TrendingBookQueue from "./trendingBookQueue";
import AllBooks from "./allBooks";
import { useUserContext } from "../../store/context";
import { useEffect } from "react";
import Footer from "../../footer";
import axios from "axios";
import Loading from "../../loading";

function Homepage({ appearChat }) {
  let { getUser, updateUserState } = useUserContext();
  let [books,setBooks]=useState(null);
  let [isLoading, setIsloading] = useState(true);  

  const fetchBooks=async ()=>{
    const response=await axios.get("http://localhost:8080/api/explore?search=percy");
    const data=await response.data;
    setBooks(await data);
  }

  let toggleSignForFetchingBooks=0;
  useEffect(() => {
    getUser();
    toggleSignForFetchingBooks^=1;
  }, []);

  useEffect(()=>{
    fetchBooks();
  },[toggleSignForFetchingBooks]);

  return (
    <>
      <div className={`${css.CentralItems} ${appearChat && css.appearChat}`}>
        <Carousels></Carousels>
        <h3 id="popular" style={{ marginLeft: "7%", marginTop: "3%" }}>
          Popular
        </h3>
        {books ? <><TrendingBookQueue books={books}></TrendingBookQueue>
        <h3 id="allBooks" style={{ marginLeft: "7%", marginTop: "3%" }}>
          All Books
        </h3>
        <AllBooks books={books}></AllBooks></>:<Loading></Loading>}
        <Footer></Footer>
      </div>
    </>
  );
}

export default Homepage;
