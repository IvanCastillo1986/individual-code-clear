import React from "react";
import ReactStars from "react-rating-stars-component"



export default function Results({ result, handleErrorClick }) {

  const todo = result.length
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

  const direct = ratingChanged()
  let cuenta = `${total * 10}% ` 
  const prueba = ()=>{
    let level = '';
    if(total <= 10 ){ level = "Great Job"}
    if(total <= 8.0  && total > 6.0 ){ level = "Good"}
    if(total <= 6.0 && total > 4.0 ){ level = "Fair"}
    if(total <= 4.0 && total > 2.0 ){ level = "Poor"}
    if(total <= 2.0 && total > 0.5 ){ level = "Warnnig"}
    if(total === 0.5){ return alert(`Alert, this page is only for programmers, if this is an error please try again  😳`)}
    return level
  }
console.log(cuenta)
  return (
    <div className="Results">
      { result[0] === "Please submit your code" 
      ? 
      (
        <div>
        <h2>Results</h2>
        <div style={{ marginTop: "20vh" }}>
           <h3>Please submit your code</h3>
           <h3>in the code editor</h3>
        </div>
        </div>
      ) :
      result.length === 0 
      
      ? (

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
          <div className="starts" >
              <ReactStars 
              count={10}
              value={total}
              color='gray'
              size={35}
              isHalf={true}
              onChange={direct}
              /> 
            
              <h6 style={{fontSize: '20px', marginTop: '4px', padding: '8px', marginLeft: '10px'}}>{cuenta}</h6>
               <h6 style={{fontSize: '20px',marginTop: '8px', padding: '4px'}} className= {prueba() === 'Great Job' ? "green-text" : null} >{prueba() === 'Great Job' ? "Great Job" : null}</h6>
               <h6 style={{fontSize: '20px',marginTop: '8px', padding: '4px'}} className= {prueba() === 'Good' ? "green-yelow-text" : null} >{prueba() === 'Good' ? "Good" : null}</h6>
               <h6 style={{fontSize: '20px',marginTop: '8px', padding: '4px'}} className= {prueba() === 'Fair' ? "yelow-text" : null} >{prueba() === 'Fair' ? "Fair" : null}</h6>
               <h6 style={{fontSize: '20px',marginTop: '8px', padding: '4px'}} className= {prueba() === 'Poor' ? "orange-text" : null} >{prueba() === 'Poor' ? "Poor" : null}</h6>
               <h6 style={{fontSize: '20px',marginTop: '8px', padding: '4px'}} className= {prueba() === 'Warnning' ? "red-text" : null} >{prueba() === 'Warnnig' ? "Warnnig" : null}</h6>
              </div>
          <div className="enside">
            <ol>
              {result
                ? result.map((item, id) => {
                    return (
                    <li key={id}
                    data-column={item.column} 
                    data-line={item.line} 
                    data-end-line={item.endLine}
                    data-end-column={item.endColumn}
                    onClick={handleErrorClick}
                    >
                        {item.endColumn ? (
                        <span>Error on line {item.line}, columns {item.column} - {item.endColumn}</span>
                        ) : (
                        <span>Error on line {item.line}, column {item.column}</span>
                        )}
                        <br/>
                        <span>Severity level of {item.severity}</span>
                        <p>{item.message}</p>
                    </li>
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
