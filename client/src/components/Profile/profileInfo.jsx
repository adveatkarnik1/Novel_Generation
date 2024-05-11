import css from "./profileInfo.module.css";
import { useUserContext } from "../../store/context";

function ProfileInfo() {
  let {username,email}=useUserContext();
  return (
    <>
      <div className={`${css.userInfo}`}>
        <div className={`${css.profileIcon}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            fill="currentColor"
            class="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
          <h3>{username}</h3>
        </div>
        <div className={`${css.userInfoOther}`}>
          <div className={`${css.infoFields}`}>
            <h4 className={`${css.info}`}>Email:</h4>
            <p className={`${css.info}`}>{email}</p>
          </div>
          {/* <div className={`${css.infoFields}`}>
            <h4 className={`${css.info}`}>Name:</h4>
            <p className={`${css.info}`}>{Name}</p>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default ProfileInfo;
