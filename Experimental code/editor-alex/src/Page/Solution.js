import React from "react";

export default function Solution({ sol }) {
  return (
    <div>
      {sol.length === 0 ? (
        <p>Congrats! You have no errors. You are a great coder!</p>
      ) : (
        <div className="result" >
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
                      <p>{item.message}</p>
                    </div>
                  );
                })
              : null}
          </ol>
        </div>
      )}
    </div>
  );
}
