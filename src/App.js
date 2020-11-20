import React, { useEffect, useState, useMemo } from "react";
import { Modal, Button } from "react-bootstrap";
import { isEqual } from "lodash";

import Image from "./image/Image";
import UserForm from "./userForm/UserForm";
import Heading from "./heading/Heading";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
const getRandomArbitrary = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

const Performance = () => (
  <article>
    <p>
      I removed the random setTimeout on server.js that was delaying the images
      responses. However the car images are huge in size. These should be
      heavily compressed. One can measure performance in the chrome network tab.
      See screenshot below
    </p>
    <img src="/network-tab.jpg" className="screenshot" />
  </article>
);

const ImagesGrid = (props) => {
  const gridCellTypeClasses = ["horizontal", "vertical", "big"];
  const { images, onClick } = props;
  return (
    <ul className="images">
      {images.map((img, index) => (
        <>
          <li
            key={`${img.id}-${index}`}
            className={gridCellTypeClasses[getRandomArbitrary(0, 2)]}
            onClick={() => onClick(img.url)}
          >
            <Image src={img.url} />
          </li>
          <li
            key={`${img.id}-profile-${index}`}
            className={gridCellTypeClasses[getRandomArbitrary(0, 2)]}
            onClick={() => onClick(img.user.profile_image)}
          >
            <Image src={img.user.profile_image} />
          </li>
        </>
      ))}
    </ul>
  );
};

const MemoImagesGrid = React.memo(ImagesGrid, (props, nextProps) => {
  if (isEqual(props.images, nextProps.images)) {
    return true;
  }
});

const App = () => {
  const [images, setImages] = useState();
  const [show, setShow] = useState(false);
  const [currentModalImage, setCurrentModalImage] = useState(null);
  const handleClose = () => setShow(false);

  const openModal = (imgUrl) => {
    setShow(true);
    setCurrentModalImage(imgUrl);
  };

  useEffect(() => {
    fetch("http://localhost:5000/images?limit=10")
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        setImages(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="app">
      {images && (
        <>
          <Heading text="UI Development" />
          <MemoImagesGrid images={images} onClick={openModal} />
          <Heading text="Performance" />
          <Performance />
          <Heading text="User Form" />
          <UserForm />
          <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body className="image__modal__body">
              <Image src={currentModalImage} className="image__modal" />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default App;
