import Carousel from "react-bootstrap/Carousel";
import css from "./carousals.module.css";
import "./common.css"
import { Link } from "react-router-dom";

function Carousels() {
  return (
    <>
      <Carousel className={`${css.carousels}`}>
        <Carousel.Item
          className={``}
          interval={1000}
          style={{ height: "100%", width: "100%" }}
        >
          <Link
            target="_blank"
            to={`/book/6614191dc8a81f34a656d8a3`}
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              color: "white",
            }}
          >
            <img
              className={`${css.carouselImg}`}
              src="book1.jpeg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Percy Jackson and the Titan's Curse</h3>
              {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        <Carousel.Item
          className={``}
          interval={1000}
          style={{ height: "100%" }}
        >
          <Link
            target="_blank"
            to={`/book/661416e8c8a81f34a656d89e`}
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              color: "white",
            }}
          >
            <img
              className={`${css.carouselImg}`}
              src="book2.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>The Sea of Monsters</h3>
              {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        <Carousel.Item
          className={``}
          interval={1000}
          style={{ height: "100%" }}
        >
          <Link
            target="_blank"
            to={`/book/6613f041f0efa2d9d412029c`}
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              color: "white",
            }}
          >
            <img className={`${css.carouselImg}`} src="book3.jpg" alt="" />
            <Carousel.Caption>
              <h3>Percy Jackson and the Olympians</h3>
              {/* <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p> */}
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default Carousels;
