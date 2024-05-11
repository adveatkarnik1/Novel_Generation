import Carousel from "react-bootstrap/Carousel";
import css from "./carousals.module.css";
import "./common.css"

function Carousels() {
  return (
    <>
      <Carousel className={`${css.carousels}`}>
        <Carousel.Item
          className={``}
          interval={1000}
          style={{ height: "100%" }}
        >
          <img
            className={`${css.carouselImg}`}
            src="29660.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={``} interval={500} style={{ height: "100%" }}>
          <img
            className={`${css.carouselImg}`}
            src="29660.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item
          className={``}
          interval={1000}
          style={{ height: "100%" }}
        >
          <img
            className={`${css.carouselImg}`}
            src="29660.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default Carousels;
