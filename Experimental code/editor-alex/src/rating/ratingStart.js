import React from "react";
import gray from "../images/startgray.png";
import blue from "../images/startBlue.png";
import yelow from "../images/startYelow.png";

export default function ratingStart({ value }) {
  const rating = (value) => {
    switch (value) {
      case 0:
        return gray;
      case 50:
        return blue;
      case 100:
        return yelow;
      default:
    }
  };

const total = (id)=>{
    for( let i = 0; i < id.length; i++ ) {
         console.log(id.i , 'idafca')

    }

}

  const getStart = (value) => {
    const starts = [];

    const [whole, part] = parseFloat(value).toString().split(".");
    for (let i = 0; i < whole ; i++) {}starts.push(100) ;
        //  Math.min(whole[i])
    // for(let i = 0; i < part; i++){} starts.push(50);

    // if (part >= 0){} starts.push(50);
    // for (let i = whole; i > ( part ? 9 : 10); i++) starts.push(0);
    return starts
  };


  return (
    <div>
      {getStart(value).map((value) => (
        <img src={rating(value)} alt="rating" width="40" />
      ))}
    </div>
  );
}
