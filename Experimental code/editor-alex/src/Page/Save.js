import React from "react";
import { Link } from "react-router-dom";

export default function Save({ last}) {
  console.log(last, 'estoy dentro')
   return (
      <div className="containersave">
        <div>
          <Link to={"/"}>
            <button className="btnSalvar">Back</button>
          </Link>
          <div className="container">{last}</div>
        </div>
        <div>
        </div>
      </div>

   )
};
