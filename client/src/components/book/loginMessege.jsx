import css from "./loginMessege.module.css";
import { useNavigate } from "react-router-dom";

function LoginMessege({handleClose}) {
    const navigate=useNavigate();
  return (
    <>
      {/* <div className={`${css.msgOuterDiv}`}> */}
        <div className={`${css.loginMessegeDiv}`}>
          <div className={`${css.closeButtonDiv}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
              onClick={handleClose}
              cursor={"pointer"}
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </div>
          <p>Please login to access this feature.</p>
          <button
            onClick={() => navigate("/login")}
            type="button"
            className={`btn btn-outline-light me-2 ${css.loginButton}`}
          >
            Login
          </button>
        </div>
      {/* </div> */}
    </>
  );
}

export default LoginMessege;
