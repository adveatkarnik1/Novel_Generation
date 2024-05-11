import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import MyNavbar from "./components/homepage/navbar";
import Sidebar from "./components/homepage/sidebar";
import LoginContainer from "./components/signin/loginContainer";
import Homepage from "./components/homepage/homepage";
import Book from "./components/book/book";
import { useState } from "react";
import { UserProvider,useUserContext } from "./store/context";
import ProfilePage from "./components/Profile/profilePage";
import ChatBot from "./components/chatBot/chatbot";
import ChatBox from "./components/chatBot/chatBox";

function App() {
  let [ sidebarToggle, setSidebarToggle ] = useState(true);
  let [appearChat,setAppearChat]=useState(false);
  function handleSidebarToggle() {
    setSidebarToggle(!sidebarToggle);
  }
   return <>
       <UserProvider>
         <Router>
           <Routes>
             <Route path="/login" element={<LoginContainer />} />
             <Route
               path="/"
               element={
                 <>
                   {
                     <MyNavbar
                       handleSidebarToggle={handleSidebarToggle}
                     ></MyNavbar>
                   }
                   <div
                     className={`slidebarAndOtherFlex ${
                       appearChat && "appearChat"
                     }`}
                   >
                     {sidebarToggle && <Sidebar></Sidebar>}
                     <Homepage appearChat={appearChat} />{" "}
                     <ChatBot
                       setAppearChat={setAppearChat}
                       appearChat={appearChat}
                     ></ChatBot>
                   </div>
                 </>
               }
             />
             <Route
               path="/book/:_id"
               element={
                 <>
                   {
                     <MyNavbar
                       handleSidebarToggle={handleSidebarToggle}
                     ></MyNavbar>
                   }
                   <div
                     className={`slidebarAndOtherFlex ${
                       appearChat && "appearChat"
                     }`}
                   >
                     {sidebarToggle && <Sidebar></Sidebar>}
                     <Book appearChat={appearChat} />
                     <ChatBot
                       setAppearChat={setAppearChat}
                       appearChat={appearChat}
                     ></ChatBot>
                   </div>
                 </>
               }
             />
             <Route
               path="/profile"
               element={
                 <>
                   {
                     <MyNavbar
                       handleSidebarToggle={handleSidebarToggle}
                     ></MyNavbar>
                   }
                   <div
                     className={`slidebarAndOtherFlex ${
                       appearChat && "appearChat"
                     }`}
                   >
                     {sidebarToggle && <Sidebar></Sidebar>}
                     <ProfilePage appearChat={appearChat} />
                     <ChatBot
                       setAppearChat={setAppearChat}
                       appearChat={appearChat}
                     ></ChatBot>
                   </div>
                 </>
               }
             />
             <Route
               path="/generator"
               element={
                 <>
                   {
                     <MyNavbar
                       handleSidebarToggle={handleSidebarToggle}
                     ></MyNavbar>
                   }
                   <div
                     className={`slidebarAndOtherFlex ${
                       appearChat && "appearChat"
                     }`}
                   >
                     {sidebarToggle && <Sidebar></Sidebar>}
                     <ChatBox></ChatBox>
                   </div>
                 </>
               }
             />
           </Routes>
         </Router>
       </UserProvider>
       {/* <PDFViewer base64Data={pdfBase64}></PDFViewer> */}
     </>
}

export default App;
