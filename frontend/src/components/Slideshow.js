import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Slideshow = (props) => {
  const properties = {
    duration: 5000,
    autoplay: false,
    transitionDuration: 500,
    arrows: false,
    infinite: true,
    easing: "ease",
  };
  return (
    <div className="primjer">
      <div className="slide-container">
        <Slide ref={props.slideref} {...properties}>
          {props.images &&
            props.images.map((each, index) => (
              <div key={index} className="each-slide">
                <img className="lazy" src={each.name} alt="sample" />
              </div>
            ))}
        </Slide>
      </div>
    </div>
  );
};

export default Slideshow;
