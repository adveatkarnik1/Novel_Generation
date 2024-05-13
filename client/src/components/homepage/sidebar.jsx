import css from "./sidebar.module.css";
import { Link,useLocation } from "react-router-dom";
function Sidebar() {
  return (
    <>
      <div
        className={`d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary ${css.sidebar}`}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {/* <svg className="bi pe-none me-2" width="40" height="32">
            <use xlink:href="#bootstrap"></use>
          </svg> */}
          <span
            style={{
              color: "white",
              display: "flex",
              // justifyContent: "space-between",
              width: "100%",
              fontSize:'10px'
            }}
            className="fs-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="#e68a19"
              className="bi bi-journal-bookmark-fill"
              viewBox="0 0 16 16"
              style={{ margin: "2px" }}
            >
              <path
                fillRule="evenodd"
                d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z"
              />
              <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
              <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
            </svg>
            <span style={{fontSize:'18px'}}>Btech Novelwala</span>
          </span>
        </a>
        <hr></hr>
        <ul className="nav nav-pills flex-column mb-auto">
          <li className={`nav-item ${css.onHover}`}>
            <Link
              to={"/"}
              className={`nav-link ${
                useLocation().pathname == "/" && "active"
              } ${css.sidebarComp}`}
              aria-current="page"
              style={{ textOverflow: "ellipsis" }}
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlink:href="#home"></use>
              </svg>
              Home
            </Link>
          </li>
          <li className={`nav-item ${css.onHover}`}>
            <Link
              to={"/generator"}
              className={`nav-link ${
                useLocation().pathname == "/generator" && "active"
              } ${css.sidebarComp}`}
              aria-current="page"
              style={{ textOverflow: "ellipsis" }}
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlink:href="#home"></use>
              </svg>
              Story Generator
            </Link>
          </li>
        </ul>
        <hr></hr>
        {/* <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            ></img>
            <strong>mdo</strong>
          </a>
          <ul className="dropdown-menu text-small shadow">
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider"></hr>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div> */}
      </div>
    </>
  );
}

export default Sidebar;
