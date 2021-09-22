import React from "react";
import down from '../images/download (16).png'


export default function rat({ value }) {
  let total = value;
  const totalStarts = 5;
  console.log(total, 'component')

  const start = ()=>{
      if(total){
      const porcentage = ( totalStarts * total ) / 100 ;
      console.log(porcentage,"%");
      const roudedPorcent = `${Math.round(porcentage *10 )}%`;
        // console.log(roudedPorcent, 'componet') 
        return roudedPorcent
      }
    
  }

const rating2 = {
  user: value
};
  const getRating = () => {
    for (let rate in rating2) {
    //   console.log(rating2[rate], "por dentro");
      const porcentage = (rating2[rate] / totalStarts) * 80;
    //   console.log(porcentage, "por");
      const roudedPorcent = `${Math.round(porcentage / 10) * 10}%`;
    //   console.log(roudedPorcent, "por");
    //   document.querySelector(`.${rate}.inner`).style.width = roudedPorcent;
    const final = (rate = roudedPorcent)
    return final;
    }
  
  };
console.log(start(), '1')
console.log(getRating(), '2')
  return(
      <div>
          {start()}
          {getRating()}
          <div className='outer'>
              <div className='inner'/>
                     {/* {(`${rating2}.inner`).style.width = getRating()} */}
                     <img src={down} alt="rating" width={getRating() }/>
          </div>
      </div>
  )
  
}
// const rating3 = (value) => {
//  if( value > 10){
//    console.log(value, "number");
//    return getRating(value)
//  }

//   console.log(value)
// };

// const rating3 = (value) => {
//   const user = ""
//   if( value.length === 0){
//     return ({user: getRating(user.value)});

//   }

// //  };
// //  console.log(value, "number");
//  console.log(rating3, 'total')

//   const getRating = () => {
//     for (let rate in rating2) {
//       console.log(rating2[rate], "por dentro");
//       const porcentage = (rating2[rate] / totalStarts) * 100;
//       // console.log(porcentage, "por");
//       const roudedPorcent = `${Math.round(porcentage / 10) * 10}%`;
//       console.log(roudedPorcent, "por");
//       // document.querySelector(`.${rate}.inner`).style.width = roudedPorcent;

//     }
//   };




// {getRating(value).map((value) => (
//     <img src={rating2(value)} alt="rating" width="40" />
//     ))}
//    <div className='outer'>
//      <div className='inner' ></div>
//    </div>

// const getRating = (value) => {
//   for (let rate in value) {
//     console.log(value[rate], "por dentro");
//     const porcentage = (value[rate.value] / totalStarts) * 100;
//     console.log(porcentage, "por");
//     const roudedPorcent = `${Math.round(porcentage / 10) * 10}%`;
//     console.log(roudedPorcent, "por");
//     document.querySelector(`.${rate}.inner`).style.width = roudedPorcent;
//   }
// };
