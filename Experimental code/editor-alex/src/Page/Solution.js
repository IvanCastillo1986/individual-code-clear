import React from "react";
import Rating from "../rating/ratingStart";
import Rate from '../rating/rat'
import ReactStars from "react-rating-stars-component"


export default function Solution({ sol }) {
  const todo = sol.length
  let count = 10
  let total = (Math.round(todo * count)  / 100 ) %2
  // const all = Math.round(total / 20) 
  // const ratingChanged = () => {
  //   if(total === 0){
  //     return (total - 10)
      
  //   }
  //   else if(total <= 5){
  //     total = 9
  //     return
  //   }
  //   else if(total <= 10){
  //     total = 8
  //     return
  //   }
  //   return
  // }; 

  console.log(total)
 
  return (
    <div>
      {sol.length === 0 ? (
        <p>Congrats! You have no errors. You are a great coder!</p>
      ) : (
        <div>
          <div className="starts">
              {/* <Rating value={todo}  /> */}
              {/* <Rate value={todo} /> */}
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
              // onChange={ratingChanged}
              />
            
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
