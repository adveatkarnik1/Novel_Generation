import css from "./footer.module.css";
function Footer(){
    return (
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
    );
}

export default Footer;