import Dropdown from "react-bootstrap/Dropdown";
import "./profileIcon.css";
import { useUserContext } from "../../store/context";
import { useNavigate } from "react-router-dom";


function ProfileIcon() {
    let { username, updateUserState } = useUserContext();
    let navigate=useNavigate();

    function logout(){
      updateUserState({
        type: "loginStatus",
        payload: false,
      });
      updateUserState({
        type: "_id",
        payload: "",
      });
      updateUserState({
        type: "username",
        payload: '',
      });
      updateUserState({
        type: "email",
        payload: '',
      });
      updateUserState({
        type: "photo",
        payload: "",
      });
      updateUserState({
        type: "isAdmin",
        payload: false,
      });
      updateUserState({
        type: "generated",
        payload: [],
      });
      updateUserState({
        type: "favourites",
        payload: [],
      });
      localStorage.removeItem('token');
      console.log(localStorage.getItem('token'));
    }
  return (
    <>
      <div className={`profileIconDiv`}>
        <Dropdown className={`profileIconContainer`}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                navigate("/profile");
              }}
            >
              My Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

export default ProfileIcon;
