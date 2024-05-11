import css from "./profilePage.module.css";
import ProfileInfo from "./profileInfo";
import TrendingBookQueue from "../homepage/trendingBookQueue";
import Generated from "./generatedResponses";
import { useUserContext } from "../../store/context";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../loading";

const ProfilePage=({appearChat}) => {
  let { getUser} = useUserContext();
  let toggleSignForFetchingBooks=0;
  useEffect(() => {
    getUser();
    // fetchBook();
    toggleSignForFetchingBooks^=1;
  }, []);
  let {favourites,generated}=useUserContext();
  const [books,setBooks]=useState([]);
  let bookArr=[];
  
  
  
  const fetchBook=async()=>{
    
    
    const bookArr1=await favourites.map(async (element)=>{
      const response=await axios.post("http://localhost:8080/api/getBookData?_id="+element._id,{
        headers:{
          "Content-Type":"application/json"
        },
        body:{
          reqFields:["coverPhoto","title","description","rating"]
        }
      });
      const data = await response.data;
      // console.log("data",data);
      // bookArr=[...bookArr,await data];
      return await data;
    });
    const bookArr1Resolved=await  Promise.all(bookArr1);
    console.log("outside map ",bookArr1Resolved);
    setBooks(bookArr1Resolved);
  }

  useEffect(()=>{
    console.log("up");
    console.log("favourites",favourites);
    fetchBook();
    console.log("down");
  },[favourites]);



  return (
    <>
      <div className={`${css.profilePage} ${appearChat && css.appearChat}`}>
        <ProfileInfo></ProfileInfo>
        <hr />
        <h2>Favourites</h2>
        {books.length>0 ?<TrendingBookQueue books={books}></TrendingBookQueue>:<Loading></Loading>}
        <hr />
        <h2>Generated</h2>
        <Generated generated={generated}></Generated>
        <footer id="footer" className={`${css.footer}`}>
          <h4>Contact us:</h4>
          <div className={`${css.footerDiv}`}>
            <div>
              <h5>Address</h5>
              <p>Raigad boys Hostel,</p>
              <p>Ambegaon bk,</p>
              <p>Pune</p>
            </div>
            <div>
              <h5>Email:</h5>
            </div>
            <div>
              <h5>Phone:</h5>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default ProfilePage;
