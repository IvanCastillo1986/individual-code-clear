import React from "react";
import Rating from "../rating/ratingStart";

export default function Solution({ sol }) {
  return (
    <div>
      {sol.length === 0 ? (
        <p>Congrats! You have no errors. You are a great coder!</p>
      ) : (
        <div>
          <div className="starts">
            {sol
              ? sol.map((starts, id) => {
                  return (
                    <div>
                      <Rating value={starts} id={id} />
                    </div>
                  );
                })
              : null}
          </div>
          <div className="result">
            <ol>
              {sol
                ? sol.map((item, id) => {
                    return (
                      <div key={id}>
                        <li> Error on line {item.line}</li>
                        {item.endColumn ? (
                          <h5> Columns {item.endColumn}</h5>
                        ) : (
                          <h5> Column {item.column}</h5>
                        )}
                        <h5>Severity level of {item.severity}</h5>
                        <p>{item.message}</p>
                      </div>
                    );
                  })
                : null}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
