import React from "react";
// import Rating from "../rating/ratingStart";
// import Rate from '../rating/rat'
import ReactStars from "react-rating-stars-component"



export default function Solution({ sol }) {
 
  const todo = sol.length
  let total = (Math.round(todo * 10)  / 10 )

  const ratingChanged = () => { 
    if(total === 1){ total = 10 }
    else if(total <= 2){ total = 9.5 }
    else if(total <= 4){ total = 8.5 }
    else if(total <= 6){ total = 8.0 }
    else if(total <= 8){ total = 7.5 }
    else if(total <= 10){ total = 6.5 }
    else if(total <= 12){ total = 6.0 }
    else if(total <= 14){ total = 5.5 }
    else if(total <= 16){ total = 5.0 }
    else if(total <= 18){ total = 4.5 }
    else if(total <= 20){ total = 4.0 }
    else if(total <= 22){ total = 3.5 }
    else if(total <= 24){ total = 3.0 }
    else if(total <= 26){ total = 2.5 }
    else if(total <= 28){ total = 2.0 }
    else if(total <= 30){ total = 1.5 }
    else if(total <= 40){ total = 1.0 }
    else if(total <= 50){ total = 0.5 }
    else if(total <= 60){ total = 0.0 }
    return 
  }; 

  const direct = ratingChanged(total)
  let cuenta = `${total}%` 
  const prueba = ()=>{
    let level = '';
    if(total <= 10 ){ level = "Great Job"}
    if(total <= 8.0  && total > 6.0 ){ level = "Good"}
    if(total <= 6.0 && total > 4.0 ){ level = "Fair"}
    if(total <= 4.0 && total > 2.0 ){ level = "poor"}
    if(total <= 2.0 && total > 0.5 ){ level = "Warnnig"}
    if(total === 0.5){ return alert(`Alert, this page is only for programmers, if this is an error please try again 👍🏽`)}
    return level
  }

  return (
    <div>
      {sol.length === 0 ? (
        <p>Congrats! You have no errors. You are a great coder!</p>
      ) : (
        <div>
          <div className="starts">
              <ReactStars 
              count={10}
              value={total}
              // char={''}
              color='gray'
              // activeColor='yelow'
              size={40}
              // edit={true}
              isHalf={true}
              // emptyIcon={true}
              // filledIcon={true}
              // a11y={true}
              onChange={direct}
              />
           {/* {level} */}
           <p style={{fontSize: '30px', marginTop: '4px', padding: '5px', marginLeft: '10px'}}>{cuenta}</p>
           <p style={{fontSize: '25px',marginTop: '8px', padding: '4px'}}>{prueba()}</p>
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
