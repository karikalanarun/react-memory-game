import React from "react";
import "./App.css";
import GameBoard from "./GameBoard";
import Image1 from "./images/image_1";
import Image2 from "./images/image_2";
import Image3 from "./images/image_3";
import Image4 from "./images/image_4";
import Image5 from "./images/image_5";
import Image6 from "./images/image_6";
import Image7 from "./images/image_7";
import Image8 from "./images/image_8";

function App() {
  return (
    <div className="App">
      <GameBoard
        images={[
          Image1,
          Image2,
          Image3,
          Image4,
          Image5,
          Image6,
          Image7,
          Image8,
        ]}
      ></GameBoard>
    </div>
  );
}

export default App;
