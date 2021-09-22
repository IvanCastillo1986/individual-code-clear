import React from "react";
import { Link } from "react-router-dom";

export default function Save({ value }) {

  console.log(value, 'dentro value')
   return (
      <div className="containersave">
        <div>
          <Link to={"/"}>
            <button className="btnSalvar">Back</button>
          </Link>
          <div className="containersave">
            <p>Day: 10:50pm</p>
            {value}</div>
        </div>
        <div>
        </div>
      </div>

   )
};
