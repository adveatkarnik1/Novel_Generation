import css from "./footer.module.css";
function Footer(){
    return (
      <footer id="footer" className={`${css.footer}`}>
        <h4 style={{ color: "#e68a19" }}>Contact us:</h4>
        <div className={`${css.footerDiv}`}>
          <div>
            <h5>Address</h5>
            <p>Raigad boys Hostel,</p>
            <p>Ambegaon bk,</p>
            <p>Pune</p>
          </div>
          <div>
            <h5>Email:</h5>
            <p>novelguy@gmail.com</p>
          </div>
          <div>
            <h5>Phone:</h5>
            <p>02346-789563</p>
          </div>
        </div>
      </footer>
    );
}

export default Footer;