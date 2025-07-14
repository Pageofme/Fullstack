import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Gallery = () => {
  const images = Array.from({ length: 8 }, (_, i) => `assets/img/product/product-0${i + 1}.jpg`);
  const [index, setIndex] = useState(-1);

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content container-fluid">
          <section className="container mt-5">
            <h1 className="my-4 mt-5 text-center text-lg-left image_title">
              Image Gallery
            </h1>
            <div className="row">
              {images.map((img, i) => (
                <div key={i} className="col-lg-3 col-md-4 col-xs-6 thumb">
                  <a href="#" onClick={(e) => { e.preventDefault(); setIndex(i); }}>
                    <figure>
                      <img
                        className="img-fluid img-thumbnail"
                        src={img}
                        alt={`Image ${i + 1}`}
                      />
                    </figure>
                  </a>
                </div>
              ))}
            </div>
            <Lightbox
              open={index >= 0}
              index={index}
              close={() => setIndex(-1)}
              slides={images.map((src) => ({ src }))}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Gallery;