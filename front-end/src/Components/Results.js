import React from "react";

export default function Results({ result }) {
  return (
    <div className="Results">
      {result.length === 0 ? (
        <div>
          <h2>Results</h2>
          <div style={{ marginTop: "20vh" }}>
             <h3>Congrats! You have no errors.</h3>
             <h3>You are a great coder!</h3>
          </div>
        </div>
      ) : (
        <div>
          <h2>Results</h2>
          <div className="enside">
            <ol>
              {result
                ? result.map((item, id) => {
                    return (
                      <div key={id}>
                        <li>
                          <span>Error on line {item.line}</span> <br></br>
                          {item.endColumn ? (
                            <span> Columns {item.endColumn}</span>
                          ) : (
                            <span> Column {item.column}</span>
                          )}
                          <br></br>
                          <span>Severity level of {item.severity}</span>
                          <p>{item.message}</p>
                        </li>
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
