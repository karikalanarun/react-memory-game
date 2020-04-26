import React, { useState, useEffect } from "react";

// {image: image, opened, completed}

const prepareInitialData = (images) =>
  images.concat(images).map((image) => ({
    image,
    opened: false,
  }));

const splitBy4 = (images) =>
  images.reduce(
    (array, curr) => {
      const lastArray = array[array.length - 1];
      if (lastArray.length === 4) {
        array.push([curr]);
      } else {
        lastArray.push(curr);
      }
      return array;
    },
    [[]]
  );

const openImage = (i, j, images) => {
  const newImages = [...images];
  newImages[i][j].opened = true;
  return newImages;
};

const closeImage = (i, j, images) => {
  const newImages = [...images];
  newImages[i][j].opened = false;
  return newImages;
};

const GameBoard = ({ images }) => {
  const [genImages, setGenImages] = useState([]);
  const [firstSelected, setFirst] = useState(null);
  const [secondSelected, setSecond] = useState(null);

  useEffect(() => {
    setGenImages(
      splitBy4(prepareInitialData(images).sort(() => Math.random() - 0.5))
    );
  }, [images]);

  useEffect(() => {
    if (firstSelected !== null && secondSelected !== null) {
      let [i, j] = firstSelected;
      let [k, l] = secondSelected;
      if (genImages[i][j].image !== genImages[k][l].image) {
        setTimeout(() => {
          setGenImages(closeImage(...firstSelected, genImages));
          setGenImages(closeImage(...secondSelected, genImages));
        }, 500);
      } else {
        console.log("success");
      }
      setFirst(null);
      setSecond(null);
    }
  }, [genImages, firstSelected, secondSelected]);

  //   useEffect(() => {
  //     genImages.length &&
  //       genImages.every(({ opened }) => opened) &&
  //       alert("game over");
  //   }, [genImages]);

  return images.length === 8 ? (
    <table>
      <tbody>
        {genImages.map((rowImages, i) => (
          <tr key={i}>
            {rowImages.map(({ image, opened }, j) => (
              <td
                key={j}
                className="col"
                onClick={
                  (!opened &&
                    (() => {
                      setGenImages(openImage(i, j, genImages));
                      firstSelected === null
                        ? setFirst([i, j])
                        : setSecond([i, j]);
                    })) ||
                  null
                }
              >
                {opened && <img className="image" src={image} />}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <h1>You should give 8 images excatly</h1>
  );
};

export default GameBoard;
