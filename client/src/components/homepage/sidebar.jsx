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
        >
          <svg className="bi pe-none me-2" width="40" height="32">
            <use xlink:href="#bootstrap"></use>
          </svg>
          <span className="fs-4">Sidebar</span>
        </a>
        <hr></hr>
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link
              to={"/"}
              className={`nav-link ${
                useLocation().pathname == "/" && "active"
              }`}
              aria-current="page"
              style={{ textOverflow: "ellipsis" }}
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlink:href="#home"></use>
              </svg>
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/generator"}
              className={`nav-link link-body-emphasis ${
                useLocation().pathname == "/generator" && "active"
              }`}
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlink:href="#speedometer2"></use>
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
